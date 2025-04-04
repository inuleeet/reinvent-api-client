import type { Collection, CollectionItem } from '~/types/collection';

export const useCollectionsStore = defineStore('collections', () => {
  const collections = ref<Collection[]>();
  const activeCollection = ref<Collection>();
  const activeCollectionItem = ref<CollectionItem>();

  const activeCollectionModel = computed({
    get: () => ({
      label: activeCollection.value?.name ?? ('' as string),
      value: activeCollection.value?.id ?? ('' as string),
    }),
    set: (collection) => {
      activeCollection.value = collections.value?.find(($collection) => {
        return $collection.id === collection.value;
      });
    },
  });

  function addCollection(collection: Collection) {
    if (!collections.value) collections.value = [];

    const hasSameId = collections.value.some(($collection) => {
      return $collection.id === collection.id;
    });

    if (hasSameId) collection.id = crypto.randomUUID();

    collections.value = [...collections.value, collection];
  }

  function addCollectionItem(item: CollectionItem) {
    if (!activeCollection.value) return;

    if (!activeCollection.value.items) activeCollection.value.items = [];

    const hasSameId = activeCollection.value.items.some(($item) => {
      return $item.id === item.id;
    });

    if (hasSameId) item.id = crypto.randomUUID();

    activeCollection.value.items = [...activeCollection.value.items, item];
  }

  function deleteCollection(collection: Collection) {
    collections.value = collections.value?.filter(($collection) => {
      return $collection.id !== collection.id;
    });
  }

  function setActiveCollection(id: string) {
    activeCollection.value = collections.value?.find(($collection) => {
      return $collection.id === id;
    });
  }

  function setActiveCollectionItem(id: string) {
    activeCollectionItem.value = activeCollection.value?.items.find(($item) => {
      return $item.id === id;
    });
  }

  return {
    collections,
    activeCollection,
    activeCollectionItem,
    activeCollectionModel,
    addCollection,
    addCollectionItem,
    deleteCollection,
    setActiveCollection,
    setActiveCollectionItem,
  };
});
