import {
  type HighlighterCore,
  type StringLiteralUnion,
  createHighlighterCore,
} from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { shallowRef } from 'vue';

const core = createHighlighterCore({
  themes: [import('@shikijs/themes/one-dark-pro')],
  langs: [import('@shikijs/langs/json')],
  engine: createJavaScriptRegexEngine(),
});

export function useShiki() {
  const highlighter = shallowRef<HighlighterCore>();

  async function highlightCode(code: string) {
    if (!highlighter.value) highlighter.value = await core;

    const options = {
      theme: highlighter.value
        .getLoadedThemes()
        .at(0) as StringLiteralUnion<string>,
      lang: highlighter.value
        .getLoadedLanguages()
        .at(0) as StringLiteralUnion<string>,
    };

    return highlighter.value.codeToHtml(code, options);
  }

  function dispose() {
    if (highlighter.value) highlighter.value.dispose();
  }

  return { highlightCode, dispose };
}
