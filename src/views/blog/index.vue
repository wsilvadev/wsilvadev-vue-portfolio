<template>
    <div>
        <div class="container-header">
            <div class="container-header__description">
                <div class="container-header__description__title-and-description">
                    <p>Willian
                        <span class="gradient-text">Simões</span> Silva
                    </p>
                    <p>Hi! I'm a frontend and mobile developer with a passion for creating modern, functional, and
                        optimized interfaces. Focused on delivering efficient and intuitive solutions, I have experience
                        with various technologies that enable me to develop for both web and mobile platforms.
                    </p>
                </div>
            </div>
            <div class="container-header__image">
                <img src="../../assets/personal_images/willian_01.jpeg" alt="blog-image" />
            </div>
        </div>
        <div class="container-content">
            <div class="container-content__gallery">
                <v-img class="image" v-for="image in images" :src="image" :key="image" alt="image" />
            </div>

        </div>

        <Avatar class="avatar" animation="hiphop" id-component="talkingPhone" />
    </div>
</template>
<script>
export default {
    name: 'BlogPost',
    data() {
        return {
            images: [
                '../../assets/personal_images/willian_01.jpeg',
                '../../assets/personal_images/willian_01.jpeg',
                '../../assets/personal_images/willian_01.jpeg',
                '../../assets/personal_images/willian_01.jpeg',
                '../../assets/personal_images/willian_01.jpeg',
            ]
        }
    },
    mounted() {
        this.fetchImages();
    },
    methods: {
        fetchImages() {
            // Fetch images from API and add them to the gallery component
        }
    }
}
</script>

<style scoped lang="scss">
.container-header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 500px;
    margin-top: 100px;
    gap: 20px;

    &__description {
        display: flex;
        flex-direction: column;
        width: 80%;
        height: 100%;
        padding: 50px 0px 50px 200px;

        &__title-and-description {
            width: 100%;
            height: 100%;

            :nth-child(1) {
                font-size: 40px;
                color: #333;
                font-weight: 900;
                font-family: var(--font-plus);
            }

            :nth-child(2) {
                font-size: 20px;
                color: #333;
                font-weight: 200;
                font-family: var(--font-poppins);
            }
        }
    }

    &__image {
        width: 600px;
        height: 100%;
        display: flex;
        justify-content: flex-start;

        img {
            width: 300px;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
            object-position: center;
        }
    }

}

.container-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;

    &__gallery {
        background-color: blue;
        width: 70%;
        height: 100%;

        .image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
            margin-bottom: 20px;
        }
    }
}

.avatar {
    width: 100%;
    height: 100%;
    top: 300px;
    left: 0;
    z-index: 99999;
    position: absolute;
}
</style>