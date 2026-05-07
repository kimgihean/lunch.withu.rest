<script setup lang="ts">
const { restaurants, fetchRestaurants, addRestaurant, recommendLunch } = useRestaurants();

const keyword = ref('');
const searchResults = ref<any[]>([]);
const recommendation = ref<any>(null);
const isSearching = ref(false);

onMounted(() => {
  fetchRestaurants();
});

// Kakao Maps Search (API: Kakao Local Search)
const searchPlaces = () => {
  if (!keyword.value.trim()) return;
  
  isSearching.value = true;
  const ps = new (window as any).kakao.maps.services.Places();
  
  ps.keywordSearch(keyword.value, (data: any, status: any) => {
    if (status === (window as any).kakao.maps.services.Status.OK) {
      searchResults.value = data;
    } else {
      searchResults.value = [];
      alert('검색 결과가 없어요! (╥﹏╥)');
    }
    isSearching.value = false;
  });
};

const handleAddRestaurant = async (place: any) => {
  try {
    await addRestaurant({
      name: place.place_name,
      address: place.address_name,
      category: place.category_name,
      phone: place.phone,
      kakaoUrl: place.place_url,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x)
    });
    alert('맛집 등록 완료! (๑>ᴗ<๑)');
    searchResults.value = [];
    keyword.value = '';
  } catch (e) {
    alert('등록에 실패했어요... (｡•́︿•̀｡)');
  }
};

const handleRecommend = () => {
  if (restaurants.value.length === 0) {
    alert('등록된 맛집이 없어요! 먼저 맛집을 검색해서 등록해주세요. (੭˃ᴗ˂)੭');
    return;
  }
  recommendation.value = recommendLunch();
};
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 flex flex-col items-center">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-5xl font-black text-pink-500 mb-2 drop-shadow-sm">
        냠냠 추천기 🍱
      </h1>
      <p class="text-pink-400 font-medium text-lg">오늘 점심은 뭐 먹을까요?</p>
    </header>

    <main class="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Left: Recommendation Section -->
      <section class="space-y-6">
        <div class="cute-card text-center">
          <h2 class="text-2xl font-bold text-pink-500 mb-4">점심 추천 받기 ✨</h2>
          <div v-if="recommendation" class="mb-6 p-4 bg-pink-50 rounded-2xl border-2 border-pink-100 animate-bounce">
            <p class="text-sm text-pink-400 mb-1">{{ recommendation.category }}</p>
            <h3 class="text-3xl font-black text-pink-600 mb-2">{{ recommendation.name }}</h3>
            <p class="text-gray-600">{{ recommendation.address }}</p>
          </div>
          <div v-else class="mb-6 py-12 text-pink-300">
            버튼을 눌러 추천을 받아보세요!
          </div>
          <button @click="handleRecommend" class="cute-button w-full text-xl">
            오늘의 메뉴는? 🎲
          </button>
        </div>

        <!-- Registered List -->
        <div class="cute-card">
          <h2 class="text-2xl font-bold text-pink-500 mb-4">우리 동네 맛집 리스트 🏠</h2>
          <div class="max-h-80 overflow-y-auto space-y-3 pr-2">
            <div v-if="restaurants.length === 0" class="text-center py-8 text-gray-400">
              아직 등록된 맛집이 없어요!
            </div>
            <div v-for="item in restaurants" :key="item.id" class="p-3 border-b border-pink-50 hover:bg-pink-50 rounded-xl transition-colors">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-gray-700">{{ item.name }}</h4>
                  <p class="text-xs text-pink-400">{{ item.category }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ item.address }}</p>
                </div>
                <a :href="item.kakaoUrl" target="_blank" class="text-xs text-blue-400 hover:underline">지도보기</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right: Search Section -->
      <section class="space-y-6">
        <div class="cute-card">
          <h2 class="text-2xl font-bold text-pink-500 mb-4">맛집 검색하기 🔍</h2>
          <div class="flex gap-2 mb-6">
            <input 
              v-model="keyword" 
              type="text" 
              placeholder="예: 강남역 맛집, 돈까스..." 
              class="cute-input flex-1"
              @keyup.enter="searchPlaces"
            />
            <button @click="searchPlaces" class="cute-button py-2 px-4">검색</button>
          </div>

          <!-- Search Results -->
          <div class="max-h-[500px] overflow-y-auto space-y-4">
            <div v-if="isSearching" class="text-center py-10">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500 mx-auto"></div>
              <p class="mt-4 text-pink-400">찾아보고 있어요...</p>
            </div>
            <div v-for="place in searchResults" :key="place.id" class="p-4 border-2 border-pink-50 border-dashed rounded-2xl hover:border-pink-200 transition-all">
              <h4 class="font-bold text-lg text-gray-800">{{ place.place_name }}</h4>
              <p class="text-sm text-pink-400 mb-1">{{ place.category_name }}</p>
              <p class="text-sm text-gray-600 mb-3">{{ place.address_name }}</p>
              <button 
                @click="handleAddRestaurant(place)" 
                class="w-full py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-xl font-bold transition-colors"
              >
                리스트에 추가하기 +
              </button>
            </div>
            <div v-if="!isSearching && searchResults.length === 0 && keyword" class="text-center py-10 text-gray-400">
              검색 결과가 여기 나타나요!
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="mt-16 text-pink-300 text-sm pb-8">
      Made with 💖 for a delicious lunch
    </footer>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
