/**
 * Related Posts - JavaScript Implementation
 * Uses Ghost Content API to fetch related posts based on tag rarity
 */

async function loadRelatedPosts(postId, tags, apiUrl, apiKey, headingText, showExcerpt) {
    try {
        // Filter out internal tags (starting with #)
        const taglist = tags.filter(tag => tag && !tag.startsWith('#'));

        if (taglist.length === 0) {
            // No tags, just get recent posts
            await getRecentPosts(postId, apiUrl, apiKey, headingText, showExcerpt);
            return;
        }

        // Get tags sorted by rarity (count.posts ascending)
        const tagsResponse = await fetch(
            `${apiUrl}/ghost/api/content/tags/?key=${apiKey}&filter=slug:[${taglist.join(',')}]&include=count.posts&order=count.posts%20ASC`
        );
        if (!tagsResponse.ok) return;
        const tagsData = await tagsResponse.json();

        if (!tagsData.tags || tagsData.tags.length === 0) {
            await getRecentPosts(postId, apiUrl, apiKey, headingText, showExcerpt);
            return;
        }

        // Fetch posts using tag rarity strategy
        // Use all tags in a single request, ordered by rarest tag first
        const tagSlugs = tagsData.tags.map(t => t.slug);
        const postsResponse = await fetch(
            `${apiUrl}/ghost/api/content/posts/?key=${apiKey}&filter=id:-[${postId}]%2Btags:[${tagSlugs.join(',')}]&limit=3&include=tags,authors`
        );
        if (!postsResponse.ok) return;
        const postsData = await postsResponse.json();

        // Deduplicate and sort by tag rarity (posts matching rarer tags first)
        const threePosts = [];
        const seenIds = new Set();

        if (postsData.posts) {
            // Score each post by the rarity of its matching tags
            const tagRarity = new Map(tagsData.tags.map((t, i) => [t.slug, i]));
            const scored = postsData.posts.map(post => {
                const postTagSlugs = (post.tags || []).map(t => t.slug);
                const bestScore = Math.min(...postTagSlugs.map(s => tagRarity.has(s) ? tagRarity.get(s) : Infinity));
                return { post, score: bestScore };
            });
            scored.sort((a, b) => a.score - b.score);

            for (const { post } of scored) {
                if (threePosts.length >= 3) break;
                if (!seenIds.has(post.id)) {
                    seenIds.add(post.id);
                    threePosts.push(post);
                }
            }
        }

        if (threePosts.length > 0) {
            renderRelatedPosts(threePosts, headingText, showExcerpt);
        }
    } catch (error) {
        console.error('Error loading related posts:', error);
    }
}

async function getRecentPosts(postId, apiUrl, apiKey, headingText, showExcerpt) {
    try {
        const response = await fetch(
            `${apiUrl}/ghost/api/content/posts/?key=${apiKey}&filter=id:-[${postId}]&limit=3&include=tags,authors`
        );
        if (!response.ok) return;
        const data = await response.json();

        if (data.posts && data.posts.length > 0) {
            renderRelatedPosts(data.posts, headingText, showExcerpt);
        }
    } catch (error) {
        console.error('Error loading recent posts:', error);
    }
}

function renderRelatedPosts(posts, headingText, showExcerpt) {
    const container = document.getElementById('related-posts-container');
    if (!container) return;

    const escapeHTML = str => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    const postsHTML = posts.map(post => {
        const safeTitle = escapeHTML(post.title);
        const imageHTML = post.feature_image
            ? `<div class="related-card__image">
                 <img src="${post.feature_image}" alt="${safeTitle}" loading="lazy" />
               </div>`
            : '';

        const excerpt = post.excerpt || post.custom_excerpt || '';
        const excerptText = escapeHTML(excerpt.split(' ').slice(0, 20).join(' '));
        const excerptHTML = showExcerpt && excerpt
            ? `<div class="related-card__excerpt">
                 ${excerptText}...
               </div>`
            : '';

        return `
            <a class="related-card" href="${post.url}">
                ${imageHTML}
                <div class="related-card__content">
                    <time class="related-card__date" datetime="${post.published_at}">
                        ${new Date(post.published_at).toISOString().split('T')[0]}
                    </time>
                    <h4 class="related-card__title">${safeTitle}</h4>
                    ${excerptHTML}
                </div>
            </a>
        `;
    }).join('');

    container.innerHTML = `
        <section class="related-posts">
            <h3 class="related-posts__title">${headingText}</h3>
            <div class="related-posts__grid">
                ${postsHTML}
            </div>
        </section>
    `;
}
