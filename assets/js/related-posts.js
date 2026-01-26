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
        const tagsData = await tagsResponse.json();

        if (!tagsData.tags || tagsData.tags.length === 0) {
            await getRecentPosts(postId, apiUrl, apiKey);
            return;
        }

        // Fetch posts using tag rarity strategy
        const threePosts = [];
        const nodupeslist = [];

        for (const tag of tagsData.tags) {
            if (threePosts.length >= 3) break;

            // Build filter to exclude already used tags
            let filterString = '';
            if (nodupeslist.length > 0) {
                filterString = `%2Btags:-[${nodupeslist.join(',')}]`;
            }

            // Fetch posts with this tag
            const postsResponse = await fetch(
                `${apiUrl}/ghost/api/content/posts/?key=${apiKey}&filter=id:-[${postId}]%2Btags:[${tag.slug}]${filterString}&limit=${3 - threePosts.length}&include=tags,authors`
            );
            const postsData = await postsResponse.json();

            if (postsData.posts && postsData.posts.length > 0) {
                for (const post of postsData.posts) {
                    if (threePosts.length < 3) {
                        threePosts.push(post);
                    }
                }
                nodupeslist.push(tag.slug);
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

    const postsHTML = posts.map(post => {
        const imageHTML = post.feature_image
            ? `<a href="${post.url}" class="related-card__image">
                 <img src="${post.feature_image}" alt="${post.title}" loading="lazy" />
               </a>`
            : '';

        const excerpt = post.excerpt || post.custom_excerpt || '';
        const excerptText = excerpt.split(' ').slice(0, 20).join(' ');
        const excerptHTML = showExcerpt && excerpt
            ? `<div class="related-card__excerpt">
                 ${excerptText}...
               </div>`
            : '';

        return `
            <article class="related-card">
                ${imageHTML}
                <div class="related-card__content">
                    <h4 class="related-card__title"><a href="${post.url}">${post.title}</a></h4>
                    ${excerptHTML}
                    <time class="related-card__date" datetime="${post.published_at}">
                        ${new Date(post.published_at).toISOString().split('T')[0]}
                    </time>
                </div>
            </article>
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
