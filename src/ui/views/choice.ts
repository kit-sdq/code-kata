import type { ChoiceKata } from '../../kata/types.ts';
import { renderInline } from '../markdown.ts';
import { setupFeedback } from '../hints.ts';
import { t } from '../i18n.ts';

function shuffled<T>(items: T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function renderChoiceView(container: HTMLElement, kata: ChoiceKata): void {
  const options = kata.shuffle ? shuffled(kata.options) : kata.options;
  const inputType = kata.multiple ? 'checkbox' : 'radio';

  const form = document.createElement('form');
  form.className = 'choice-answer-form';

  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = kata.multiple ? t('selectAll') : t('selectOne');
  fieldset.appendChild(legend);

  options.forEach((opt, i) => {
    const id = `choice-${kata.slug}-${i}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'choice-option';

    const input = document.createElement('input');
    input.type = inputType;
    input.name = 'choice';
    input.id = id;
    input.value = String(i);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerHTML = renderInline(opt.text);

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    fieldset.appendChild(wrapper);
  });

  form.appendChild(fieldset);
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = t('submit');
  form.appendChild(submit);
  container.appendChild(form);

  const feedback = setupFeedback(container, kata.slug, kata.hints);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = Array.from(fieldset.querySelectorAll('input')) as HTMLInputElement[];
    const selected = new Set(inputs.filter((i) => i.checked).map((i) => Number(i.value)));
    const correctSet = new Set(options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0));
    const correct = selected.size === correctSet.size && [...selected].every((i) => correctSet.has(i));
    feedback.report(correct);
  });
}
