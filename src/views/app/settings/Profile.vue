<script lang="ts" setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

const userData = ref({
  serviceDate: '02.12.2025 21:37',
  isVerified: 'Nie',
  twoFactor: 'Wyłączona',
  username: 'Kocham Placki',
  gender: 'Kobieta',
  orientation: 'Heteroseksualna',
  relationshipStatus: 'Singielka',
  description: `Cześć! 👋 Jestem Marysia i szukam kogoś, z kim będę mogła się śmiać się do łez i rozmawiać do wschodu słońca.

Moja codzienność:
Pracuję w marketingu cyfrowym, co kocham, bo pozwala mi łączyć kreatywność z analitycznym myśleniem.

Po godzinach: Jestem wiecznym optymistą, który wierzy, że spontaniczny wypad za miasto i dobra kawa są kluczem do szczęścia.

🖤 Moje pasje to:
Podróże - szczególnie pociągają mnie długie road tripy i zwiedzanie.
`,
  lookingCity: 'Warszawa, Wrocław',
  lookingGender: 'Mężczyzn',
  meetingsGoal: 'Konkretne spotkanie, bez zobowiązań, fwb',
  preferredAge: 'od 20 do 30 lat',
  selectedTag: 'Uległa',
  preferredSecurity: 'Zawsze gumki',
  typeOfSex: 'Klasyczny, Analny, Oralny',
  favoritePoses: 'Klasyczna, Na jeźdźca, Na pieska, Na łyżeczki',
  sport: 'Bieganie, Siłowania',
  hobby: 'Historia, Książki, Języki obce, Programowanie, Rękodzieło',
  styleOfLiving: 'Domowe zacisze, Praca, Rozwój osobisty',
  cuisine: 'Polska, Włoska, Kawa',
  uploadedMedia: [
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',

    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
    '/src/assets/img/uploaded/21037-gigachad.png',
    '/src/assets/img/uploaded/55db7bc8a84e069d252bde586720830d.jpg',
    '/src/assets/img/uploaded/dasasd.png',
    '/src/assets/img/uploaded/Rectangle 5369-2.png',
    '/src/assets/img/uploaded/Rectangle 5370-2.png',
  ],
})
</script>
<template>
  <div class="flex flex-column w-full">
    <div class="flex-shrink-0">
      <div class="w-full relative">
        <img
          src="/src/assets/img/avatars/bg-profile-image.png"
          alt="Zdjęcie w tle"
          style="opacity: 40%; border-radius: 2rem; height: 30vh; width: 100%; object-fit: cover"
        />

        <img
          src="/src/assets/img/avatars/man-avatar-2.jpg"
          alt="Zdjęcie profilowe"
          class="h-8rem w-8rem border-circle absolute"
          style="bottom: -64px; left: 64px"
        />
      </div>

      <div class="mt-8 px-4">
        <h1 class="my-2">Dane Profilu</h1>

        <div class="flex gap-4">
          <FloatLabel variant="in">
            <InputText id="serviceDate" type="text" :model-value="userData.serviceDate" readonly />
            <label for="serviceDate" type>W serwisie od</label>
          </FloatLabel>

          <FloatLabel variant="in">
            <InputText id="isVerified" type="text" :model-value="userData.isVerified" readonly />
            <label for="isVerified" type>Zweryfikowany</label>
          </FloatLabel>

          <FloatLabel variant="in">
            <InputText id="twoFactor" type="text" :model-value="userData.twoFactor" readonly />
            <label for="twoFactor" type>Weryfikacja Dwuetapowa</label>
          </FloatLabel>
        </div>
      </div>
    </div>

    <div class="flex-grow-1 px-4 pb-4">
      <Tabs value="0" class="mt-4 bg-transparent w-full">
        <TabList class="bg-transparent" style="font-family: Poppins, Inter">
          <Tab value="0">Podstawowe </Tab>
          <Tab value="1">Wyszukiwanie</Tab>
          <Tab value="2">Preferencje</Tab>
          <Tab value="3">Zainteresowania</Tab>
          <Tab value="4">Multimedia ({{ userData.uploadedMedia.length }})</Tab>
        </TabList>
        <TabPanels class="bg-transparent">
          <!-- Podstawowe -->
          <TabPanel value="0">
            <div class="m-0 w-full flex gap-3">
              <div class="w-6 flex flex-column gap-3">
                <FloatLabel variant="in">
                  <InputText
                    id="username"
                    type="text"
                    :model-value="userData.username"
                    class="w-full"
                    readonly
                  />
                  <label for="username" type>Username</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText
                    id="gender"
                    type="text"
                    :model-value="userData.gender"
                    class="w-full"
                    readonly
                  />
                  <label for="gender" type>Płeć</label>
                </FloatLabel>
                <FloatLabel variant="in">
                  <InputText
                    id="orientation"
                    type="text"
                    :model-value="userData.orientation"
                    class="w-full"
                    readonly
                  />
                  <label for="orientation" type>Orientacja</label>
                </FloatLabel>
                <FloatLabel variant="in">
                  <InputText
                    id="relationshipStatus"
                    type="text"
                    :model-value="userData.relationshipStatus"
                    class="w-full"
                    readonly
                  />
                  <label for="relationshipStatus" type>Związek</label>
                </FloatLabel>
              </div>
              <div class="w-6">
                <FloatLabel variant="in">
                  <Textarea
                    id="description"
                    type="text"
                    :model-value="userData.description"
                    rows="6"
                    class="w-full"
                    readonly
                  />
                  <label for="description" type>Opis</label>
                </FloatLabel>
              </div>
            </div>
          </TabPanel>
          <!-- Wyszukiwanie -->
          <TabPanel value="1">
            <div class="w-full flex flex-column gap-3">
              <FloatLabel variant="in">
                <InputText
                  id="lookingCity"
                  type="text"
                  :model-value="userData.lookingCity"
                  class="w-full"
                  readonly
                />
                <label for="lookingCity" type>Miejscowość</label>
              </FloatLabel>

              <FloatLabel variant="in">
                <InputText
                  id="lookingGender"
                  type="text"
                  :model-value="userData.lookingGender"
                  class="w-full"
                  readonly
                />
                <label for="lookingGender" type>Szukam</label>
              </FloatLabel>
              <FloatLabel variant="in">
                <InputText
                  id="meetingsGoal"
                  type="text"
                  :model-value="userData.meetingsGoal"
                  class="w-full"
                  readonly
                />
                <label for="meetingsGoal" type>Cel Spotkania</label>
              </FloatLabel>
              <FloatLabel variant="in">
                <InputText
                  id="preferredAge"
                  type="text"
                  :model-value="userData.preferredAge"
                  class="w-full"
                  readonly
                />
                <label for="preferredAge" type>Preferowany Wiek</label>
              </FloatLabel>
            </div>
          </TabPanel>
          <!-- Preferencje -->
          <TabPanel value="2">
            <div class="w-full flex flex-column gap-3">
              <FloatLabel variant="in">
                <InputText
                  id="selectedTag"
                  type="text"
                  :model-value="userData.selectedTag"
                  class="w-full"
                  readonly
                />
                <label for="selectedTag" type>Tag</label>
              </FloatLabel>

              <FloatLabel variant="in">
                <InputText
                  id="preferredSecurity"
                  type="text"
                  :model-value="userData.preferredSecurity"
                  class="w-full"
                  readonly
                />
                <label for="preferredSecurity" type>Preferowane Zabezpieczenie</label>
              </FloatLabel>
              <FloatLabel variant="in">
                <InputText
                  id="typeOfSex"
                  type="text"
                  :model-value="userData.typeOfSex"
                  class="w-full"
                  readonly
                />
                <label for="typeOfSex" type>Rodzaj Seksu</label>
              </FloatLabel>
              <FloatLabel variant="in">
                <InputText
                  id="favoritePoses"
                  type="text"
                  :model-value="userData.favoritePoses"
                  class="w-full"
                  readonly
                />
                <label for="favoritePoses" type>Ulubione pozycje</label>
              </FloatLabel>
            </div>
          </TabPanel>
          <!-- Zainteresowania -->
          <TabPanel value="3">
            <div class="w-full flex flex-column gap-3">
              <FloatLabel variant="in">
                <InputText
                  id="sport"
                  type="text"
                  :model-value="userData.sport"
                  class="w-full"
                  readonly
                />
                <label for="sport" type>Sport</label>
              </FloatLabel>

              <FloatLabel variant="in">
                <InputText
                  id="hobby"
                  type="text"
                  :model-value="userData.hobby"
                  class="w-full"
                  readonly
                />
                <label for="hobby" type>Hobby</label>
              </FloatLabel>
              <FloatLabel variant="in">
                <InputText
                  id="styleOfLiving"
                  type="text"
                  :model-value="userData.styleOfLiving"
                  class="w-full"
                  readonly
                />
                <label for="styleOfLiving" type>Styl Życia</label>
              </FloatLabel>
              <FloatLabel variant="in">
                <InputText
                  id="cuisine"
                  type="text"
                  :model-value="userData.cuisine"
                  class="w-full"
                  readonly
                />
                <label for="cuisine" type>Kuchnia</label>
              </FloatLabel>
            </div>
          </TabPanel>
          <!-- Multimedia -->
          <TabPanel value="4">
            <div id="uploadedMedia" class="uploadedImg">
              <img
                v-for="(media, index) in userData.uploadedMedia"
                :key="index"
                :src="media"
                alt="Uploaded Media"
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>
.custom-tab-view :deep(.p-tabview-nav) {
  background: var(--surface-ground);
  border: none;
  border-bottom: 2px solid var(--surface-600);
}

.custom-tab-view :deep(.p-tabview-header) {
  background: var(--surface-ground);
}

.custom-tab-view :deep(.p-tabview-nav li) {
  margin-right: 0.5rem;
  border: none;
}

.custom-tab-view :deep(.p-tabview-nav a) {
  background: transparent !important;
  color: var(--text-color-secondary) !important;
  font-weight: 500;
  border: none !important;
  border-radius: 0;
  padding: 0.5rem 1rem;
}

.custom-tab-view :deep(.p-tabview-nav .p-highlight .p-tabview-header a) {
  color: var(--primary-color) !important;
  background: transparent !important;
  border-bottom: 2px solid var(--primary-color) !important;
  margin-bottom: -2px;
}

/* Custom class for dark input background */
.bg-input-dark {
  background-color: var(--surface-900) !important;
  color: var(--text-color);
  border: none !important;
  padding: 1rem;
}

/* Wymuszenie tła dla InputText w trybie readonly (dla niektórych motywów) */
.bg-input-dark:read-only {
  background-color: var(--surface-900) !important;
  opacity: 1;
}

/* Uploaded Images */
.uploadedImg {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 0.5rem;
}

.uploadedImg > img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
