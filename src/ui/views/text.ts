import type { TextKata } from '../../kata/types.ts';
import { matchText } from '../../check/normalize.ts';
import { setupFeedback } from '../hints.ts';

export function renderTextView(container: HTMLElement, kata: TextKata): void {
  const form = document.createElement('form');
  form.className = 'text-answer-form';
  form.innerHTML = `
    <label for="text-answer">Your answer</label>
    <input id="text-answer" name="answer" type="text" autocomplete="off" />
    <button type="submit">Submit</button>
  `;
  container.appendChild(form);

  const feedback = setupFeedback(container, kata.slug, kata.hints);
  const input = form.querySelector('input') as HTMLInputElement;
  if (feedback.progress.solved) input.value = '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.report(matchText(input.value, kata));
  });
}
