<template>
  <div>
    <NuxtLayout name="header"> </NuxtLayout>
    <main>
      <slot />
    </main>
    <NuxtLayout name="footer"> </NuxtLayout>
  </div>
</template>

<script setup></script>
