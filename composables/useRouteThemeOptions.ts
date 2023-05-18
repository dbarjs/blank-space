import { WritableComputedRef } from "vue";

export interface RouteThemeOptions {
  hexSourceColor?: string;
  isDarkModeEnabled?: boolean;
}

export interface UseRouteThemeOptionsReturn {
  spaceName: WritableComputedRef<string>;
  hexSourceColor: WritableComputedRef<string | undefined>;
  isDarkModeEnabled: WritableComputedRef<boolean>;
}

export function useRouteThemeOptions(): UseRouteThemeOptionsReturn {
  const router = useRouter();
  const route = useRoute();

  const currentQuery = ref<Record<string, string>>({});
  const currentParams = ref<Record<string, string>>({});

  const hexSourceColor = computed<string | undefined>({
    get: () => route.query.color as string | undefined,
    set: (value) => {
      currentQuery.value.color = value || "";

      updateRoute();
    },
  });

  const isDarkModeEnabled = computed<boolean>({
    get: () => route.query.mode !== "light",
    set: (value) => {
      currentQuery.value.mode = value ? "dark" : "light";

      updateRoute();
    },
  });

  const spaceName = computed<string>({
    get: () => (route.params.name as string) || "",
    set: (value) => {
      currentQuery.value.name = value || "";

      updateRoute();
    },
  });

  const updateRoute = useDebounceFn(
    async () => {
      const query = { ...route.query, ...currentQuery.value };

      await router.replace({ query });
    },
    100,
    {
      maxWait: 500,
    }
  );

  return {
    hexSourceColor,
    isDarkModeEnabled,
    spaceName,
  };
}
