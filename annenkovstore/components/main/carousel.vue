<template>
  <div id="default-carousel" class="relative" data-carousel="static">
    <!-- Carousel wrapper -->
    <div
      class="overflow-hidden relative md:h-96 h-40 rounded-lg sm:h-40 xl:h-80 2xl:h-96"
    >
      <!-- Item 1 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <span
          class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800"
          >First Slide</span
        >
        <img
          src="~/assets/images/1.jpg"
          class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        />
      </div>
      <!-- Item 2 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img
          src="~/assets/images/2.jpg"
          class="block absolute "
          alt="..."
        />
      </div>
      <!-- Item 3 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img
          src="~/assets/images/3.jpg"
          class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        />
      </div>
      <!-- Item 4 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img
          src="~/assets/images/4.webp"
          class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        />
      </div>
    </div>
    <!-- Slider controls -->
    <div
      class="max-w-fit absolute bottom-10 left-0 z-30  mx-4 cursor-pointer  focus-visible:outline-none"
      data-carousel-prev
    >
      <span
        class="inline-flex justify-center rounded-md items-center w-8 h-8  sm:w-10 sm:h-10 bg-black/70 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </span>
    </div>
    <div
      class="absolute bottom-11  right-0 z-30  mx-4 cursor-pointer"
      data-carousel-next
    >
      <span
        class="inline-flex justify-center rounded-md  items-center w-8 h-8  sm:w-10 sm:h-10 bg-black/70 "
      >
        <svg
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
