<template>
  <div>
    <div class="flex items-center mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
      Email - <span class="text-transparent bg-clip-text bg-gradient-to-r bg-blue-700 from-sky-400">UI</span>
      <svg class="w-18 h-16 ml-5 mr-2 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.064 58.064">
        <polygon points="17.064,31.032 58.064,10.032 24.064,35.032 44.064,48.032 58.064,10.032 0,22.032"/>
        <polygon points="24.064,35.032 20.127,48.032 17.064,31.032 58.064,10.032"/>
        <polygon points="24.064,35.032 20.064,48.032 31.912,40.133"/>
      </svg>
    </div>
  <form>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca correos, remitentes..." required>
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
    </div>
  </form>
  <div class="block w-full p-4 ps-10 mt-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <div v-if="emails.length > 0" class="mt-4">
      <h2 class="text-lg font-semibold mb-2">Lista de correos:</h2>
      <ul>
        <!-- Itera sobre tu lista de correos y muestra cada elemento -->
        <li v-for="(email, index) in emails" :key="index" class="mb-2">{{ email }}</li>
      </ul>
    </div>
    <!-- Mensaje si no hay correos -->
    <div v-else>
      <p>No se encontraron correos.</p>
    </div>
  </div>
  </div>
</template>



<script setup>
const emails = ["correo1@example.com", "correo2@example.com"]; // Tu lista de correos
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/vue/20/solid'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>