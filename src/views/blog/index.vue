<template>
    <div class="blog-container">
        <!-- Header Section -->
        <header class="blog-header">
            <div class="blog-header__content">
                <div class="blog-header__text">
                    <h1 class="blog-header__title">
                        Willian <span class="gradient-text">Simões</span> Silva
                    </h1>
                    <p class="blog-header__description">
                        Hi! I'm a frontend and mobile developer with a passion for creating modern, functional, and
                        optimized interfaces. Focused on delivering efficient and intuitive solutions, I have experience
                        with various technologies that enable me to develop for both web and mobile platforms.
                    </p>
                </div>
                <div class="blog-header__image">
                    <img src="../../assets/personal_images/willian_01.jpeg"
                        alt="Willian Simões Silva - Frontend Developer" loading="lazy" />
                </div>
            </div>
        </header>

        <!-- Blog Content Section -->
        <main class="blog-content">
            <div class="blog-content__header">
                <h2 class="blog-content__title">GitHub Favorites</h2>
                <p class="blog-content__subtitle">Projects I've starred and found interesting on GitHub</p>
            </div>

            <div class="blog-content__gallery">
                <!-- Loading State -->
                <div v-if="isLoading && blogPosts.length === 0" class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Loading your GitHub favorites...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h3>Oops! Something went wrong</h3>
                    <p>{{ error }}</p>
                    <button @click="retryFetch" class="retry-btn">Try Again</button>
                </div>

                <!-- Posts Grid -->
                <template v-else>
                    <article v-for="post in blogPosts" :key="post.id" class="blog-card"
                        @click="navigateToPost(post.slug)" role="button" tabindex="0">
                        <div class="blog-card__image">
                            <img :src="post.image" :alt="post.title" loading="lazy" />
                            <div class="blog-card__category">{{ post.category }}</div>
                        </div>
                        <div class="blog-card__content">
                            <h3 class="blog-card__title">{{ post.title }}</h3>
                            <p class="blog-card__excerpt">{{ post.excerpt }}</p>

                            <!-- GitHub Stats -->
                            <div class="blog-card__github-stats">
                                <div class="github-stat">
                                    <span class="github-stat__icon">⭐</span>
                                    <span class="github-stat__value">{{ post.stars || 0 }}</span>
                                </div>
                                <div class="github-stat">
                                    <span class="github-stat__icon">🔄</span>
                                    <span class="github-stat__value">{{ post.forks || 0 }}</span>
                                </div>
                                <div class="github-stat" v-if="post.language">
                                    <span class="github-stat__icon">💻</span>
                                    <span class="github-stat__value">{{ post.language }}</span>
                                </div>
                            </div>

                            <div class="blog-card__meta">
                                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                                <span class="blog-card__read-time">{{ post.readTime }} min read</span>
                            </div>
                        </div>
                    </article>
                </template>
            </div>

            <!-- Load More Button -->
            <div v-if="hasMorePosts" class="blog-content__load-more">
                <button @click="loadMorePosts" class="load-more-btn" :disabled="isLoading">
                    <span v-if="!isLoading">Load More Posts</span>
                    <span v-else>Loading...</span>
                </button>
            </div>
        </main>

        <!-- Avatar Animation - Positioned purposefully -->
        <div class="avatar-container">
            <Avatar class="avatar-animation" :animation="currentAnimation" :id-component="currentAnimation"
                :key="avatarKey" @click="showAvatarInfo" />


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Avatar from '../../components/Avatar.vue'

// Reactive data
const blogPosts = ref([])
const isLoading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const postsPerPage = 8
const avatarKey = ref(0)
const avatarCache = ref(null)
const currentAnimationIndex = ref(0)
const avatarAnimations = ['talkingPhone', 'hiphop', 'typing']

// Computed
const hasMorePosts = computed(() => blogPosts.value.length < 24)
const currentAnimation = computed(() => avatarAnimations[currentAnimationIndex.value])

// GitHub API configuration
const GITHUB_USERNAME = 'wsilvadev'
const GITHUB_API_BASE = 'https://api.github.com'

// Default fallback data in case GitHub API fails
const fallbackPosts = [
    {
        id: 1,
        title: "Building Modern Web Applications with Vue 3",
        excerpt: "Learn how to leverage Vue 3's Composition API to build scalable and maintainable web applications...",
        image: "../../assets/personal_images/willian_01.jpeg",
        category: "Vue.js",
        date: "2024-01-15",
        readTime: 8,
        slug: "building-modern-web-applications-vue3"
    },
    {
        id: 2,
        title: "Optimizing Performance in React Applications",
        excerpt: "Discover advanced techniques for improving performance in React applications...",
        image: "../../assets/personal_images/willian_01.jpeg",
        category: "React",
        date: "2024-01-10",
        readTime: 12,
        slug: "optimizing-performance-react"
    }
]

// Methods
const fetchPosts = async (page = 1) => {
    try {
        // Fetch starred repositories from GitHub
        const starredResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/starred?page=${page}&per_page=${postsPerPage}&sort=updated`)

        if (!starredResponse.ok) {
            throw new Error(`GitHub API error: ${starredResponse.status}`)
        }

        const starredRepos = await starredResponse.json()

        // Filter only public repositories
        const publicRepos = starredRepos.filter(repo => !repo.private)

        // Transform GitHub repos to blog post format
        const posts = publicRepos.map((repo, index) => {
            // Determine category based on language or topics
            const category = repo.language || repo.topics?.[0] || 'Development'

            // Create excerpt from description or default text
            const excerpt = repo.description ||
                `A ${repo.language || 'software'} project that showcases modern development practices and innovative solutions.`

            // Estimate read time based on repository size and complexity
            const readTime = Math.max(3, Math.min(15, Math.floor(repo.size / 1000) + 3))

            return {
                id: repo.id,
                title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                excerpt: excerpt.length > 120 ? excerpt.substring(0, 120) + '...' : excerpt,
                content: repo.description || 'No description available',
                image: repo.owner.avatar_url || "../../assets/personal_images/willian_01.jpeg",
                category: category,
                date: repo.updated_at,
                readTime: readTime,
                slug: repo.name,
                githubUrl: repo.html_url,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                topics: repo.topics || []
            }
        })

        return posts
    } catch (err) {
        console.error('Error fetching from GitHub:', err)
        error.value = err.message || 'Failed to fetch from GitHub'
        console.log('Falling back to default posts...')
        return fallbackPosts
    }
}

const loadMorePosts = async () => {
    if (isLoading.value) return

    isLoading.value = true
    currentPage.value++

    try {
        const newPosts = await fetchPosts(currentPage.value)
        blogPosts.value.push(...newPosts)
    } catch (error) {
        console.error('Error loading posts:', error)
    } finally {
        isLoading.value = false
    }
}

const navigateToPost = (slug) => {
    // Find the post to get the GitHub URL
    const post = blogPosts.value.find(p => p.slug === slug)
    if (post && post.githubUrl) {
        // Open GitHub repository in new tab
        window.open(post.githubUrl, '_blank')
    } else {
        console.log(`GitHub URL not found for: ${slug}`)
    }
}

const retryFetch = async () => {
    error.value = null
    await fetchInitialPosts()
}

const initializeAvatarCache = () => {
    // Check if avatar is already cached in localStorage
    const cachedAvatar = localStorage.getItem('avatar-animation-cache')

    if (cachedAvatar) {
        try {
            avatarCache.value = JSON.parse(cachedAvatar)
            console.log('Avatar animation loaded from cache')
        } catch (err) {
            console.error('Error parsing cached avatar:', err)
            localStorage.removeItem('avatar-animation-cache')
        }
    }

    // Force avatar re-render to ensure proper positioning
    avatarKey.value = Date.now()
}

const cacheAvatarAnimation = (animationData) => {
    try {
        avatarCache.value = animationData
        localStorage.setItem('avatar-animation-cache', JSON.stringify(animationData))
        console.log('Avatar animation cached successfully')
    } catch (err) {
        console.error('Error caching avatar animation:', err)
    }
}

const simulateAvatarLoading = () => {
    // Simulate avatar animation loading and caching
    setTimeout(() => {
        const animationData = {
            loaded: true,
            timestamp: Date.now(),
            animation: currentAnimation.value,
            version: '1.0.0'
        }
        cacheAvatarAnimation(animationData)
    }, 2000) // Simulate 2 second loading time
}

const showAvatarInfo = () => {
    if (avatarCache.value) {
        const cacheTime = new Date(avatarCache.value.timestamp).toLocaleTimeString()
        alert(`Avatar Animation Info:\n\n` +
            `✅ Loaded from cache\n` +
            `🕒 Cached at: ${cacheTime}\n` +
            `🎭 Animation: ${avatarCache.value.animation}\n` +
            `📦 Version: ${avatarCache.value.version}`)
    } else {
        alert('Avatar Animation Info:\n\n⏳ Still loading...\n🔄 Cache not ready yet')
    }
}

const rotateAnimation = () => {
    currentAnimationIndex.value = (currentAnimationIndex.value + 1) % avatarAnimations.length
    avatarKey.value = Date.now() // Force re-render with new animation

    // Update cache with new animation
    if (avatarCache.value) {
        avatarCache.value.animation = currentAnimation.value
        cacheAvatarAnimation(avatarCache.value)
    }

    console.log(`Animation changed to: ${currentAnimation.value}`)
}

const startAutoRotation = () => {
    // Auto-rotate animations every 10 seconds
    setInterval(() => {
        rotateAnimation()
    }, 10000) // 10 seconds
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Functions
const fetchInitialPosts = async () => {
    isLoading.value = true
    error.value = null

    try {
        const posts = await fetchPosts()
        blogPosts.value = posts
    } catch (err) {
        console.error('Error fetching initial posts:', err)
        error.value = err.message || 'Failed to fetch posts'
    } finally {
        isLoading.value = false
    }
}

// Lifecycle
onMounted(() => {
    // Initialize avatar cache first
    initializeAvatarCache()

    // Simulate avatar loading and caching
    simulateAvatarLoading()

    // Start auto-rotation of animations
    startAutoRotation()

    // Then fetch blog posts
    fetchInitialPosts()
})
</script>

<style scoped lang="scss">
.blog-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.blog-header {
    padding: 80px 20px 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &__content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 60px;

        @media (max-width: 768px) {
            flex-direction: column;
            text-align: center;
            gap: 40px;
        }
    }

    &__text {
        flex: 1;

        @media (max-width: 768px) {
            order: 2;
        }
    }

    &__title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 900;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);
        margin-bottom: 24px;
        line-height: 1.2;

        .gradient-text {
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }

    &__description {
        font-size: clamp(1.1rem, 2.5vw, 1.25rem);
        font-weight: 300;
        font-family: var(--font-poppins, 'Poppins', sans-serif);
        line-height: 1.6;
        opacity: 0.95;
        max-width: 600px;
    }

    &__image {
        flex-shrink: 0;

        @media (max-width: 768px) {
            order: 1;
        }

        img {
            width: 300px;
            height: 300px;
            border-radius: 16px;
            object-fit: cover;
            object-position: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;

            @media (max-width: 768px) {
                width: 250px;
                height: 250px;
            }

            &:hover {
                transform: translateY(-5px);
            }
        }
    }
}

.blog-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px;

    &__header {
        text-align: center;
        margin-bottom: 60px;
    }

    &__title {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 16px;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);
    }

    &__subtitle {
        font-size: 1.125rem;
        color: #718096;
        font-family: var(--font-poppins, 'Poppins', sans-serif);
    }

    &__gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 30px;
        margin-bottom: 60px;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }

    &__load-more {
        text-align: center;
    }
}

.blog-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    &:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }

    &__image {
        position: relative;
        height: 200px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .blog-card:hover & img {
            transform: scale(1.05);
        }
    }

    &__category {
        position: absolute;
        top: 16px;
        left: 16px;
        background: rgba(102, 126, 234, 0.9);
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        backdrop-filter: blur(10px);
    }

    &__content {
        padding: 24px;
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 12px;
        line-height: 1.4;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__excerpt {
        font-size: 0.875rem;
        color: #718096;
        line-height: 1.6;
        margin-bottom: 20px;
        font-family: var(--font-poppins, 'Poppins', sans-serif);

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__github-stats {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    &__meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        color: #a0aec0;

        time {
            font-weight: 500;
        }

        .blog-card__read-time {
            background: #f7fafc;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 600;
        }
    }
}

.loading-state,
.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    grid-column: 1 / -1;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error-state {
    color: #dc2626;

    .error-icon {
        font-size: 3rem;
        margin-bottom: 20px;
    }

    h3 {
        color: #dc2626;
        margin-bottom: 12px;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);
    }

    p {
        color: #7f1d1d;
        margin-bottom: 24px;
        max-width: 400px;
    }
}

.retry-btn {
    background: #dc2626;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #b91c1c;
        transform: translateY(-1px);
    }
}

.github-stat {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f8fafc;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    color: #64748b;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;

    &:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
    }

    &__icon {
        font-size: 0.875rem;
    }

    &__value {
        font-weight: 600;
        color: #475569;
    }
}

.load-more-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-poppins, 'Poppins', sans-serif);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }
}

.avatar-container {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 1000;

    @media (max-width: 1200px) {
        bottom: 35px;
        right: 35px;
    }

    @media (max-width: 768px) {
        bottom: 25px;
        right: 25px;
    }

    @media (max-width: 480px) {
        bottom: 20px;
        right: 20px;
    }
}

.avatar-animation {
    position: relative;
    width: 300px;
    height: 300px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    // Hover effect to make it more interactive
    &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    // Active state for click feedback
    &:active {
        transform: scale(0.95);
    }

    // Responsive adjustments
    @media (max-width: 1200px) {
        width: 120px;
        height: 120px;
    }

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }

    @media (max-width: 480px) {
        width: 80px;
        height: 80px;
    }

    // Ensure avatar is always visible and accessible
    &:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }
}

.avatar-cache-indicator {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #10b981;
    color: white;
    border-radius: 20px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    animation: pulse 2s infinite;
    white-space: nowrap;

    .cache-icon {
        font-size: 12px;
    }

    .animation-name {
        font-weight: 600;
        text-transform: capitalize;
        font-size: 10px;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animation-rotate-btn {
    position: absolute;
    bottom: -8px;
    left: -8px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    transition: all 0.2s ease;
    z-index: 1001;

    &:hover {
        background: #5a67d8;
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: 2px solid #4c51bf;
        outline-offset: 2px;
    }

    .rotate-icon {
        font-size: 16px;
        transition: transform 0.3s ease;
    }

    &:hover .rotate-icon {
        transform: rotate(180deg);
    }
}

@media (max-width: 480px) {
    .blog-header {
        padding: 60px 16px 40px;
    }

    .blog-content {
        padding: 60px 16px;
    }

    .blog-card__content {
        padding: 20px;
    }
}
</style>