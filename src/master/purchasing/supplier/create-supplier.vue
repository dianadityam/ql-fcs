<template>
  <LayoutMain>
    <div class="p-5">
      <div>
        <p class="text-lg font-medium mb-3">Form Supplier</p>
      </div>
      <div class="p-5 bg-white rounded border-t-4 border-primary">
        <div class="flex flex-col gap-2 mb-3">
          <p class="font-bold text-base">Item Header</p>
          <p class="text-sm text-red-500">New Data</p>
        </div>
        <div class="grid grid-cols-6 gap-3 gap-x-20">
          <div
            v-for="(item, index) in field"
            :key="index"
            :class="`${item.col} grid grid-cols-7 items-center`"
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
              v-model="item.value"
            />
            <FormControl
              :required="false"
              v-if="item.type == 'area'"
              type="textarea"
              :placeholder="item.placeholder"
              class="col-span-5 w-full"
              v-model="item.value"
            />
            <div v-if="item.type == 'select'" :class="item.col">
              <FormControl
                :type="item.type"
                :placeholder="item.placeholder"
                v-model="item.value"
                :options="item.options"
                class="w-full flex"
              />
            </div>
            <div v-if="item.type == 'number'" class="col-span-5">
              <FormControl
                :type="item.type"
                :placeholder="item.placeholder"
                v-model="item.value"
                class="w-full flex"
              />
            </div>
            <div v-if="item.type == 'radio'">
              <div class="col-span-2 flex items-center gap-4">
                <div
                  v-for="(chek, i) in item.options"
                  :key="i"
                  class="flex items-center gap-1.5"
                >
                  <input
                    class="w-4 h-4"
                    type="radio"
                    :value="chek.value"
                    :id="i"
                    v-model="item.value"
                  />
                  <label :for="i" class="font-medium whitespace-nowrap">{{
                    chek.label
                  }}</label>
                </div>
              </div>
            </div>
            <p v-if="item.err" class="text-red-500 col-span-5 text-xs">
              {{ item.err }}
            </p>
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
        <div class="flex justify-end mt-5">
          <Btn @click="postData" class="p-2">Save</Btn>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>
<script setup>
import { ref, reactive, handleError } from "vue";
import FormControl from "@/components/FormControl.vue";
import { mdiMagnify, mdiSwapVertical } from "@mdi/js";
import { useMainStore } from "@/store/main";

const previewImg = ref(null);
const store = useMainStore();

const field = ref([
  {
    label: "Kode",
    placeholder: "Masukan Kode",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "kode",
    err: "",
  },
  {
    label: "Tipe Supplier",
    placeholder: "- Pilih Tipe -",
    value: "",
    col: "col-span-3",
    type: "select",
    prop: "tipe",
    err: "",
    options: [
      {
        id: 1,
        label: "Korporate",
        value: "Korporate",
      },
      {
        id: 2,
        label: "Biasa Aja",
        value: "Biasa Aja",
      },
    ],
  },
  {
    label: "Nama Supplier",
    placeholder: "Masukan Nama",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "nama",
    err: "",
  },
  {
    label: "Termin (Hari)",
    placeholder: "Masukan Termin(hari)",
    value: "",
    col: "col-span-3",
    type: "number",
    prop: "termin",
    err: "",
  },
  {
    label: "Pajak",
    placeholder: "Masukan Pajak",
    value: "",
    col: "col-span-3",
    type: "radio",
    prop: "pajak",
    options: [
      { label: "Ya", value: true },
      { label: "Tidak", value: false },
    ],
    err: "",
  },
  {
    label: "NPWP",
    placeholder: "Masukan No. NPWP",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "npwp",
    err: "",
  },
  {
    label: "SPPKP",
    placeholder: "Masukan No. SPPKP",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "sppkp",
    err: "",
  },
  {
    label: "No Coa",
    placeholder: "Masukan No. SPPKP",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "no_coa",
    err: "",
  },
  {
    label: "Bank Pengirim",
    placeholder: "Masukan Nama Bank",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "bank",
    err: "",
  },
  {
    label: "Kode Area Bank Pengirim",
    placeholder: "Masukan Kode Area Bank",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "kode_bank",
    err: "",
  },
  {
    label: "No. Rekening Pengirim",
    placeholder: "Masukan Rekening Bank",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "no_rekening",
    err: "",
  },
  {
    label: "Nama Rekening Pengirim",
    placeholder: "Masukan Nama Rekening",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "nama_rekening",
    err: "",
  },
  {
    label: "Alamat",
    placeholder: "Masukan Alamat",
    value: "",
    col: "col-span-3",
    type: "area",
    prop: "alamat",
    err: "",
  },
  {
    label: "Alamat 2",
    placeholder: "Masukan Alamat ke2",
    value: "",
    col: "col-span-3",
    type: "area",
    prop: "alamat_2",
    err: "",
  },
  {
    label: "Negara",
    placeholder: "Masukan Negara",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "negara",
    err: "",
  },
  {
    label: "Provinsi",
    placeholder: "Masukan Provinsi",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "provinsi",
    err: "",
  },
  {
    label: "Kota",
    placeholder: "Masukan Provinsi",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "kota",
    err: "",
  },
  {
    label: "Phone 1",
    placeholder: "Masukan No HP",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "no_telp",
    err: "",
  },
  {
    label: "Phone 2",
    placeholder: "Masukan No HP2",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "no_telp2",
    err: "",
  },
  {
    label: "Email",
    placeholder: "Masukan Email",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "email",
    err: "",
  },
  {
    label: "B2B",
    placeholder: "Masukan Email",
    value: "",
    col: "col-span-3",
    type: "radio",
    prop: "is_b2b",
    options: [
      { label: "Ya", value: true },
      { label: "Tidak", value: false },
    ],
    err: "",
  },
  {
    label: "Contact Person 1",
    placeholder: "Masukan Kontak Person",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "cp",
    err: "",
  },
  {
    label: "Contact Person 2",
    placeholder: "Masukan Kontak Person 2",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "cp2",
    err: "",
  },
  {
    label: "Contact Phone CP 1",
    placeholder: "Masukan Kontak Phone CP 1",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "",
    err: "",
  },
  {
    label: "Contact Phone CP 2",
    placeholder: "Masukan Kontak Phone CP 2",
    value: "",
    col: "col-span-3",
    type: "text",
    prop: "",
    err: "",
  },
  {
    label: "Catatan",
    placeholder: "Masukan Catatan",
    value: "",
    col: "col-span-3",
    type: "area",
    prop: "catatan",
    err: "",
  },
  {
    label: "Status",
    placeholder: "Masukan Catatan",
    value: "",
    col: "col-span-3",
    type: "radio",
    prop: "is_active",
    options: [
      {
        label: "Aktif",
        value: true,
      },
      {
        label: "Tidak Aktif",
        value: false,
      },
    ],
    err: "",
  },
]);

const postData = () => {
  let form = {};
  field.value.forEach((el) => {
    form[el.prop] = el.value?.value ?? el.value;
    el.err = "";
  });
  console.log(form);
  const data = {
    path: "operation/m_supplier",
    body: form,
  };
  store
    .postApi(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      let errMsg = err.errors;
      if (errMsg) {
        for (const key in errMsg) {
          field.value.forEach((el) => {
            if (key == el.prop) {
              el.err = errMsg[key][0];
            }
          });
        }
      }
    });
};
</script>
