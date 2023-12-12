<template>
  <LayoutMain>
    <div class="p-5">
      <div>
        <p class="text-lg font-medium mb-3">Form Item Kain Knitting</p>
      </div>
      <div class="p-5 bg-white rounded border-t-4 border-primary">
        <div class="flex flex-col gap-2 mb-3">
          <p class="font-bold text-base">Item Header</p>
          <p class="text-sm text-red-500">New Data</p>
        </div>
        <div class="grid grid-cols-6 gap-3 gap-x-20">
          <div
            v-for="(item, index) in form"
            :key="index"
            :class="`${item.col} grid grid-cols-7`"
          >
            <p
              :class="`${
                item.label == 'Aksesoris' ? 'col-span-1' : 'col-span-2'
              } font-medium py-1`"
            >
              {{ item.label }}
            </p>
            <FormControl
              v-if="item.type == 'text'"
              :type="item.type"
              :placeholder="item.placeholder"
              class="col-span-5 w-full"
            />
            <FormControl
              :required="false"
              v-if="item.type == 'area'"
              type="textarea"
              :placeholder="item.placeholder"
              class="col-span-5 w-full"
            />
            <div v-if="item.type == 'select'" class="col-span-3">
              <FormControl
                :type="item.type"
                :placeholder="item.placeholder"
                v-model="item.value"
                :options="[
                  { id: 1, label: 'pilih' },
                  { id: 2, label: 'pilih' },
                  { id: 3, label: 'pilih' },
                ]"
                class="w-full flex"
              />
            </div>
            <div
              v-if="item.type == 'radio'"
              class="col-span-5 flex items-center gap-10"
            >
              <div
                v-for="(radio, i) in item.options"
                :key="i"
                class="flex items-center gap-1"
              >
                <input
                  type="radio"
                  id="two"
                  :value="radio.value"
                  v-model="item.value"
                />
                <label for="two">{{ radio.value }}</label>
              </div>
            </div>
            <div v-if="item.type == 'file'" class="col-span-5 relative">
              <input
                @change="onInputFile($event)"
                type="file"
                class="border-2 p-1.5 text-xs w-full rounded focus:ring-2"
              />
              <div
                class="h-32 w-32 border border-slate-300 rounded bg-slate-200 mt-5 flex items-center justify-center"
              >
                <img
                  v-if="previewImg"
                  :src="previewImg"
                  alt=""
                  class="w-full h-full object-cover rounded border"
                />
                <mdicon
                  v-else
                  :path="mdiCameraOutline"
                  size="28"
                  class="w-full text-gray-400"
                />
              </div>
            </div>
            <div v-if="item.type == 'checkbox'">
              <div class="col-span-2 flex items-center gap-3">
                <div
                  v-for="(chek, i) in item.options"
                  :key="i"
                  class="flex items-center gap-1.5"
                >
                  <input
                    type="checkbox"
                    :id="i"
                    :value="chek.value"
                    v-model="item.value"
                    @change="onChek"
                  />
                  <label for="jack">{{ chek.value }}</label>
                </div>
              </div>
            </div>
            <div
              v-if="item.label == 'Aksesoris' && item.value.length"
              class="col-span-7 mt-3"
            >
              <Aksesoris :field="aksesorisFiltered" />
            </div>
          </div>
        </div>
        <div class="py-5">
          <div class="flex flex-col gap-3 mb-3">
            <p class="font-bold text-base">Item Header</p>
            <div class="w-full max-w-xs relative">
              <input
                placeholder="SUP0001"
                class="text-sm border px-2 py-1 focus:ring-1 focus:outline-none rounded-[4px] text-black w-full"
              />
              <mdicon
                :path="mdiMagnify"
                size="18"
                class="absolute right-0 h-7 w-9 border rounded-sm top-[1px]"
              />
            </div>
            <div>
              <btn class="p-2" bg="bg-primary">add to list</btn>
            </div>
          </div>
        </div>
        <div class="flex w-full p-2 font-semibold text-sm">
          <div class="w-20 flex gap-1">
            <p>No.</p>
            <mdicon
              :path="mdiSwapVertical"
              class="w-5 text-gray-500"
              size="24"
            />
          </div>
          <div class="w-full flex gap-1 justify-between">
            <p>Supplier</p>
            <mdicon
              :path="mdiSwapVertical"
              class="w-5 text-gray-500"
              size="24"
            />
          </div>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>
<script setup>
import { ref, reactive } from "vue";
import FormControl from "@/components/FormControl.vue";
import { mdiCameraOutline, mdiMagnify, mdiSwapVertical } from "@mdi/js";
import Aksesoris from "./aksesoris.vue";

const previewImg = ref(null);

const aksesoris = ref([
  {
    name: "Rib",
    form: [
      {
        label: "Jenis Rib",
        value: "",
        type: "select",
      },
      {
        label: "Spandex",
        disabled: false,
        value: "",
        type: "select",
      },
      {
        label: "Lebar Rib",
        value: "",
        type: "select",
      },
      {
        label: "Ukuran Benang",
        value: "",
        type: "select",
      },
    ],
  },
  {
    name: "Kerah",
    form: [
      {
        label: "Jenis Kerah",
        value: "",
        type: "select",
      },
      {
        label: "Spandex",
        disabled: false,
        value: "",
        type: "select",
      },
      {
        label: "Lebar Kerah",
        value: "",
        type: "select",
      },
      {
        label: "Berat Kerah",
        value: "",
        type: "select",
      },
    ],
  },
  {
    name: "Manset",
    form: [
      {
        label: "Jenis Manset",
        value: "",
        type: "select",
      },
      {
        label: "Spandex",
        disabled: false,
        value: "",
        type: "select",
      },
      {
        label: "Lebar Manset",
        value: "",
        type: "select",
      },
      {
        label: "Berat Manset",
        value: "",
        type: "select",
      },
    ],
  },
]);

const form = ref([
  {
    label: "Artikel",
    placeholder: "Masukan Nama",
    value: "",
    col: "col-span-3",
    type: "text",
  },
  {
    label: "Jenis Kain",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  {
    label: "Nama Barang",
    placeholder: "Masukan Nama",
    value: "",
    col: "col-span-3",
    type: "text",
  },
  {
    label: "Eceran",
    placeholder: "BENANG COTTON COMBED 100% 30",
    value: "",
    col: "col-span-3",
    type: "radio",
    options: [
      {
        id: 1,
        value: "Bisa",
      },
      {
        id: 2,
        value: "Tidak",
      },
    ],
  },
  {
    label: "Jenis Rajutan",
    placeholder: "BENANG COTTON COMBED 100% 30",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  //   {
  //     label: "Yarn Length",
  //     placeholder: "BENANG COTTON COMBED 100% 30",
  //     value: "",
  //     col: "col-span-3",
  //     type: "select",
  //   },
  {
    label: "Nama Benang",
    placeholder: "BENANG COTTON COMBED 100% 30",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  {
    label: "Ukuran Benang",
    placeholder: "BENANG COTTON COMBED 100% 30",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  {
    label: "Komposisi Benang",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  //   {
  //     label: "Ukuran Get Mesin",
  //     placeholder: "- Pilih Ukuran -",
  //     value: "",
  //     col: "col-span-3",
  //     type: "select",
  //   },
  //   {
  //     label: "Lebar Mesin",
  //     placeholder: "- Pilih Ukuran -",
  //     value: "",
  //     col: "col-span-3",
  //     type: "select",
  //   },
  {
    label: "Gramasi Kain",
    placeholder: "- Pilih Ukuran -",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  {
    label: "Satuan",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  {
    label: "Aksesoris",
    placeholder: "- Safety Stock -",
    value: [],
    col: "col-span-6",
    type: "checkbox",
    options: [
      {
        id: 1,
        value: "Rib",
      },
      {
        id: 2,
        value: "Kerah",
      },
      {
        id: 3,
        value: "Manset",
      },
    ],
  },
  {
    label: "Safety Stock",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "text",
  },
  {
    label: "Status",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "select",
  },
  {
    label: "Foto Produk",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "file",
  },
  {
    label: "Catatan Internal",
    placeholder: "- Safety Stock -",
    value: "",
    col: "col-span-3",
    type: "area",
  },
]);
const aksesorisFiltered = ref([...aksesoris.value]);
const onChek = (e) => {
  let val = form.value.find((form) => form.label == "Aksesoris").value;
  aksesorisFiltered.value = aksesoris.value.filter((el) =>
    val.includes(el.name)
  );
};

const onInputFile = (e) => {
  const file = e.target.files[0];
  previewImg.value = URL.createObjectURL(file);
};
</script>
