import { WritableComputedRef } from "vue";

/**
 * Route-based theme options.
 */
export interface RouteThemeOptions {
  hexSourceColor?: string;
  isDarkModeEnabled?: boolean;
}

/**
 * Return type of the `useRouteThemeOptions` composable.
 */
export interface UseRouteThemeOptionsReturn {
  spaceName: WritableComputedRef<string>;
  hexSourceColor: WritableComputedRef<string | undefined>;
  isDarkModeEnabled: WritableComputedRef<boolean>;
}

/**
 * Composable for managing theme options based on route query parameters.
 * It provides writable computed properties for `spaceName`, `hexSourceColor`,
 * and `isDarkModeEnabled` that synchronize with the route query parameters.
 *
 * @returns An object containing the writable computed properties for `spaceName`,
 * `hexSourceColor`, and `isDarkModeEnabled`.
 */
export function useRouteThemeOptions(): UseRouteThemeOptionsReturn {
  const router = useRouter();
  const route = useRoute();

  const currentQuery = ref<Record<string, string>>({});

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
    { maxWait: 500 }
  );

  return {
    spaceName,
    hexSourceColor,
    isDarkModeEnabled,
  };
}
