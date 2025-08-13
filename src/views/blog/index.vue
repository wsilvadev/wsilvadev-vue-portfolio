<template>
    <div class="blog-container">
        <!-- Animated Background -->
        <div class="animated-background">
            <div class="floating-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
            </div>
        </div>

        <!-- Header Section -->
        <header class="blog-header" data-aos="fade-down" data-aos-duration="1000">
            <div class="blog-header__content">
                <div class="blog-header__text" data-aos="fade-right" data-aos-delay="300">
                    <h1 class="blog-header__title">
                        Willian <span class="gradient-text">Simões</span> Silva
                    </h1>
                    <p class="blog-header__description">
                        Hi! I'm a frontend and mobile developer with a passion for creating modern, functional, and
                        optimized interfaces. Focused on delivering efficient and intuitive solutions, I have experience
                        with various technologies that enable me to develop for both web and mobile platforms.
                    </p>
                </div>
                <div class="blog-header__image" data-aos="fade-left" data-aos-delay="500">
                    <div class="image-container">
                        <img src="../../assets/personal_images/willian_01.jpeg"
                            alt="Willian Simões Silva - Frontend Developer" loading="lazy" />
                        <div class="image-glow"></div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Blog Content Section -->
        <main class="blog-content">
            <div class="blog-content__header" data-aos="fade-up" data-aos-delay="200">
                <div class="header-decoration">
                    <div class="decoration-line"></div>
                    <div class="decoration-dot"></div>
                    <div class="decoration-line"></div>
                </div>
                <h2 class="blog-content__title">GitHub Favorites</h2>
                <p class="blog-content__subtitle">Projects I've starred and found interesting on GitHub</p>
            </div>

            <div class="blog-content__gallery">
                <!-- Loading State -->
                <div v-if="isLoading && blogPosts.length === 0" class="loading-state" data-aos="zoom-in">
                    <div class="loading-spinner"></div>
                    <p>Loading your GitHub favorites...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="error-state" data-aos="shake">
                    <div class="error-icon">⚠️</div>
                    <h3>Oops! Something went wrong</h3>
                    <p>{{ error }}</p>
                    <button @click="retryFetch" class="retry-btn">Try Again</button>
                </div>

                <!-- Posts Grid -->
                <template v-else>
                    <article v-for="(post, index) in blogPosts" :key="post.id" class="blog-card"
                        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'" :data-aos-delay="(index % 4) * 100"
                        @click="navigateToPost(post.slug)" role="button" tabindex="0">

                        <div class="blog-card__image">
                            <img :src="post.image" :alt="post.title" loading="lazy" />
                            <div class="blog-card__category">{{ post.category }}</div>
                            <div class="card-overlay">
                                <div class="overlay-content">
                                    <span class="view-project">View Project →</span>
                                </div>
                            </div>
                        </div>

                        <div class="blog-card__content">
                            <h3 class="blog-card__title">{{ post.title }}</h3>
                            <p class="blog-card__excerpt">{{ post.excerpt }}</p>

                            <!-- GitHub Stats -->
                            <div class="blog-card__github-stats">
                                <div class="github-stat" data-aos="zoom-in" data-aos-delay="100">
                                    <span class="github-stat__icon">⭐</span>
                                    <span class="github-stat__value">{{ post.stars || 0 }}</span>
                                </div>
                                <div class="github-stat" data-aos="zoom-in" data-aos-delay="200">
                                    <span class="github-stat__icon">🔄</span>
                                    <span class="github-stat__value">{{ post.forks || 0 }}</span>
                                </div>
                                <div class="github-stat" v-if="post.language" data-aos="zoom-in" data-aos-delay="300">
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
            <div v-if="hasMorePosts" class="blog-content__load-more" data-aos="fade-up">
                <button @click="loadMorePosts" class="load-more-btn" :disabled="isLoading">
                    <span v-if="!isLoading">Load More Posts</span>
                    <span v-else>Loading...</span>
                    <div class="btn-shine"></div>
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
    position: relative;
    overflow-x: hidden;
}

// Animated Background
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

.floating-shapes {
    position: relative;
    width: 100%;
    height: 100%;
}

.shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    animation: float 20s infinite ease-in-out;

    &.shape-1 {
        width: 80px;
        height: 80px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
        animation-duration: 25s;
    }

    &.shape-2 {
        width: 120px;
        height: 120px;
        top: 60%;
        right: 15%;
        animation-delay: 5s;
        animation-duration: 30s;
    }

    &.shape-3 {
        width: 60px;
        height: 60px;
        bottom: 20%;
        left: 20%;
        animation-delay: 10s;
        animation-duration: 20s;
    }

    &.shape-4 {
        width: 100px;
        height: 100px;
        top: 30%;
        right: 30%;
        animation-delay: 15s;
        animation-duration: 35s;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.7;
    }

    25% {
        transform: translateY(-20px) rotate(90deg);
        opacity: 1;
    }

    50% {
        transform: translateY(-10px) rotate(180deg);
        opacity: 0.8;
    }

    75% {
        transform: translateY(-30px) rotate(270deg);
        opacity: 0.9;
    }
}

.blog-header {
    padding: 80px 20px 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
        animation: grain 20s linear infinite;
    }

    &__content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 60px;
        position: relative;
        z-index: 1;

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
        position: relative;

        .gradient-text {
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(45deg, #ffd700, #ffed4e);
                border-radius: 2px;
                transform: scaleX(0);
                transform-origin: left;
                animation: underline 2s ease-in-out infinite;
            }
        }
    }

    &__description {
        font-size: clamp(1.1rem, 2.5vw, 1.25rem);
        font-weight: 300;
        font-family: var(--font-poppins, 'Poppins', sans-serif);
        line-height: 1.6;
        opacity: 0.95;
        max-width: 600px;
        animation: slideInUp 1s ease-out 0.5s both;
    }

    &__image {
        flex-shrink: 0;

        @media (max-width: 768px) {
            order: 1;
        }

        .image-container {
            position: relative;
            display: inline-block;
        }

        img {
            width: 300px;
            height: 300px;
            border-radius: 16px;
            object-fit: cover;
            object-position: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transition: all 0.5s ease;
            position: relative;
            z-index: 2;

            @media (max-width: 768px) {
                width: 250px;
                height: 250px;
            }

            &:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
            }
        }

        .image-glow {
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: linear-gradient(45deg, rgba(255, 215, 0, 0.3), rgba(255, 237, 78, 0.3));
            border-radius: 20px;
            filter: blur(20px);
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: 1;
        }

        &:hover .image-glow {
            opacity: 1;
        }
    }
}

@keyframes grain {

    0%,
    100% {
        transform: translate(0, 0);
    }

    10% {
        transform: translate(-5%, -5%);
    }

    20% {
        transform: translate(-10%, 5%);
    }

    30% {
        transform: translate(5%, -10%);
    }

    40% {
        transform: translate(-5%, 15%);
    }

    50% {
        transform: translate(-10%, 5%);
    }

    60% {
        transform: translate(15%, 0%);
    }

    70% {
        transform: translate(0%, 10%);
    }

    80% {
        transform: translate(3%, 15%);
    }

    90% {
        transform: translate(-10%, 10%);
    }
}

@keyframes underline {

    0%,
    100% {
        transform: scaleX(0);
    }

    50% {
        transform: scaleX(1);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.blog-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px;
    position: relative;
    z-index: 1;

    &__header {
        text-align: center;
        margin-bottom: 60px;
        position: relative;

        .header-decoration {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30px;
            gap: 20px;

            .decoration-line {
                width: 60px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #667eea, transparent);
                animation: expandLine 2s ease-in-out infinite;
            }

            .decoration-dot {
                width: 8px;
                height: 8px;
                background: #667eea;
                border-radius: 50%;
                animation: pulse 2s ease-in-out infinite;
            }
        }
    }

    &__title {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 16px;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 2px;
        }
    }

    &__subtitle {
        font-size: 1.125rem;
        color: #718096;
        font-family: var(--font-poppins, 'Poppins', sans-serif);
        animation: fadeIn 1s ease-out 0.8s both;
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

@keyframes expandLine {

    0%,
    100% {
        transform: scaleX(0.5);
        opacity: 0.5;
    }

    50% {
        transform: scaleX(1);
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.blog-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    &:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);
        border-color: rgba(102, 126, 234, 0.3);

        &::before {
            opacity: 1;
        }

        .card-overlay {
            opacity: 1;
        }

        .blog-card__image img {
            transform: scale(1.1);
        }
    }

    &:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }

    &__image {
        position: relative;
        height: 220px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 2;

            .overlay-content {
                color: white;
                text-align: center;

                .view-project {
                    font-size: 1.1rem;
                    font-weight: 600;
                    font-family: var(--font-poppins, 'Poppins', sans-serif);
                    letter-spacing: 0.5px;
                }
            }
        }
    }

    &__category {
        position: absolute;
        top: 16px;
        left: 16px;
        background: rgba(102, 126, 234, 0.95);
        color: white;
        padding: 8px 16px;
        border-radius: 25px;
        font-size: 0.875rem;
        font-weight: 600;
        backdrop-filter: blur(10px);
        z-index: 3;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;

        &:hover {
            background: rgba(102, 126, 234, 1);
            transform: scale(1.05);
        }
    }

    &__content {
        padding: 28px;
        position: relative;
        z-index: 2;
    }

    &__title {
        font-size: 1.3rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 12px;
        line-height: 1.4;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.3s ease;

        &:hover {
            color: #667eea;
        }
    }

    &__excerpt {
        font-size: 0.9rem;
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
        gap: 12px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    &__meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        color: #a0aec0;
        padding-top: 16px;
        border-top: 1px solid #e2e8f0;

        time {
            font-weight: 500;
            transition: color 0.3s ease;

            &:hover {
                color: #667eea;
            }
        }

        .blog-card__read-time {
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            padding: 6px 12px;
            border-radius: 15px;
            font-weight: 600;
            color: #4a5568;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;

            &:hover {
                background: linear-gradient(135deg, #edf2f7, #e2e8f0);
                transform: translateY(-1px);
            }
        }
    }
}

.loading-state,
.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    grid-column: 1 / -1;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
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
    animation: shake 0.5s ease-in-out;

    .error-icon {
        font-size: 4rem;
        margin-bottom: 24px;
        animation: bounce 2s infinite;
    }

    h3 {
        color: #dc2626;
        margin-bottom: 16px;
        font-family: var(--font-plus, 'Plus Jakarta Sans', sans-serif);
    }

    p {
        color: #7f1d1d;
        margin-bottom: 32px;
        max-width: 400px;
    }
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    75% {
        transform: translateX(5px);
    }
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

.retry-btn {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-poppins, 'Poppins', sans-serif);
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);

    &:hover {
        background: linear-gradient(135deg, #b91c1c, #991b1b);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
    }

    &:focus {
        outline: 3px solid #dc2626;
        outline-offset: 2px;
    }
}

.github-stat {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    padding: 8px 14px;
    border-radius: 25px;
    font-size: 0.8rem;
    color: #64748b;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &:hover {
        background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        border-color: #cbd5e1;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    &__icon {
        font-size: 1rem;
        transition: transform 0.3s ease;
    }

    &:hover &__icon {
        transform: scale(1.2);
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
    padding: 18px 36px;
    border-radius: 50px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-poppins, 'Poppins', sans-serif);
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }

    .btn-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
    }

    &:hover .btn-shine {
        left: 100%;
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
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);

    &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }

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
        padding: 24px;
    }

    .floating-shapes .shape {
        display: none; // Hide shapes on very small screens for performance
    }
}

// Smooth scrolling for the entire page
html {
    scroll-behavior: smooth;
}

// Enhanced focus states for accessibility
*:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

// Performance optimizations
.blog-card,
.github-stat,
.load-more-btn {
    will-change: transform, box-shadow;
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>