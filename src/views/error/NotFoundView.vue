<template>
  <div class="mt-36 mb-48 flex flex-row justify-center gap-56">
    <div>
      <RouterLink to="/">
        <img src=" @/assets/404.png">
      </RouterLink>
    </div>
    <div class="flex flex-col justify-center gap-8">
      <div class="font-title">
        <h1 class="text-9xl text-primary-400">404</h1>
        <h2 class="text-5xl text-primary-400">NOT FOUND</h2>
      </div>
      <div>
        <div class="text-xl">糟糕！您訪問的頁面似乎不存在！</div>
        <small>請確認您輸入的網址是否正確，或是點擊
          <RouterLink to="/" class="text-primary-500 hover:text-primary-400">躺卷</RouterLink>
          回到首頁
        </small>
      </div>
    </div>
  </div>
</template>

<style></style>
