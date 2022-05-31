import { watch, ref } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const historyList = [source.value];
  const history = ref(historyList);
  watch(source, (value) => historyList.push(value), { flush: 'sync' });
  return { history };
}
