<template>
  <div>
    <div
      class="flex items-center justify-center mb-4 text-3xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
      Email - <span class="text-transparent bg-clip-text bg-gradient-to-r bg-blue-700 from-sky-400">UI</span>
      <svg class="w-18 h-16 ml-5 mr-2 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 58.064 58.064">
        <polygon points="17.064,31.032 58.064,10.032 24.064,35.032 44.064,48.032 58.064,10.032 0,22.032" />
        <polygon points="24.064,35.032 20.127,48.032 17.064,31.032 58.064,10.032" />
        <polygon points="24.064,35.032 20.064,48.032 31.912,40.133" />
      </svg>
    </div>
    <form class="max-w-md mx-auto" @submit.prevent="searchEmails">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
      <div class="relative rounded-full overflow-hidden">
        <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input v-model="inputSearch" type="search" id="default-search"
          class="block w-full p-4 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Busca correos, remitentes..." required>
        <button type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
      </div>
    </form>
    <div v-if="searched && emails.length > 0" class="mt-4 max-h-[800px]">
      <div class="flex flex-col">
        <div class="py-2 -my-2 sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
          <div class="shadow overflow-x-auto sm:rounded-lg rounded">
            <table class="min-w-full table rounded">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    From / To
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Subject / Content
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Date
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-for="(email, index) in emails" :key="index" class="w-full">
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <div class="flex items-center">

                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-gray-900">
                          {{ email._source.from.length > 100 ? email._source.content.slice(0, 30) + '...' :
                            email._source.from }}
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          {{ email._source.to.length > 100 ? email._source.content.slice(0, 30) + '...' :
                            email._source.to }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <div class="text-sm font-medium leading-5 text-gray-900">
                      {{ email._source.subject.length > 0 ? (email._source.subject.length > 100 ?
                        email._source.subject.slice(0, 40) + '...' : email._source.subject) : 'NO SUBJECT' }}
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      {{ email._source.content.length > 100 ? email._source.content.slice(0, 50) + '...' :
                        email._source.content }}
                    </div>
                  </td>

                  <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
                    <div class="text-sm leading-5 text-gray-500">
                      {{ email._source.date.slice(0, 17) }}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                    <a class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="showEmailDetail(email)">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <div v-if="isModalOpen"
        class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-lg sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
          <h2 class="text-xl mb-4 font-bold"> {{ selectedEmail._source.subject }} </h2>
          <div class="flex justify-between mb-4">
            <div>
              <p class="font-bold">From:</p>
              <p>{{ selectedEmail._source.from }}</p>
            </div>
            <div>
              <p class="font-bold">To:</p>
              <p class="truncate">{{ selectedEmail._source.to.slice(0, 50) }}</p>
            </div>
            <div>
              <p class="font-bold">Date:</p>
              <p>{{ selectedEmail._source.date }}</p>
            </div>
          </div>
          <hr class="my-4 border-t-2 border-gray-300">
          <p class="overflow-y-auto max-h-[600px]">{{ selectedEmail._source.content }}</p>
          <button @click="closeModal" class="text-indigo-600 hover:text-indigo-900 cursor-pointer">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputSearch = ref('');
const searched = ref(false);
const emails = ref([]);
const isModalOpen = ref(false);
const selectedEmail = ref(null);

const searchEmails = async () => {
  try {
    const searchTerm = inputSearch.value;
    console.log('SE BUSCARA POR', searchTerm);

    const response = await fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: searchTerm }),
    });

    const data = await response.json();
    console.log('Data: ', data);

    if (data && data.hits && data.hits.hits) {
      emails.value = data.hits.hits;
      console.log('Emails:', emails);
    } else {
      emails.value = [];
    }

    searched.value = true;

  } catch (error) {
    console.error('Error:', error);
  }
};

const showEmailDetail = (email) => {
  selectedEmail.value = email;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>