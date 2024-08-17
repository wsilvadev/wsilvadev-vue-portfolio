<template>
    <v-card
      class="mx-auto text-white card-container"
      max-width="400"
      :prepend-icon="mdicon"
      :title="title"
    >

      <template v-slot:prepend>
        <v-icon size="x-large"></v-icon>
      </template>
  
      <v-card-text class="text-h5 py-2">
        {{ description }}
      </v-card-text>
  
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-avatar>
          </template>
  
          <v-list-item-title>Willian</v-list-item-title>
  
          <v-list-item-subtitle>{{language}}</v-list-item-subtitle>
  
        </v-list-item>
      </v-card-actions>
      
    </v-card>

  </template>
  <script>
export default {
props: ['mdicon', 'title', "description", "language"]

}
</script>
<style scoped>
.card-container {
background: linear-gradient(120deg, var(--color-purple) 50%,  var(--color-blue) 100%);
}
.v-card-actions {
  position: absolute;
  bottom: 0;
}

</style>