<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  margin-bottom: 24px;
}

nav > a {
  text-decoration: none;
  height: 24px;
  background-color: #d6e6ff;
  padding: 16px;
  margin: 16px 0;
  display: block;
  width: fit-content;
  border-radius: 5px;
}
</style>
