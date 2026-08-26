import { getProgress, setProgress, type KataProgress } from './progress.ts';

/**
 * Shared feedback/hints/progress wiring used by the text and choice views:
 * an aria-live feedback line, progressive hint reveal, and localStorage persistence.
 */
export interface FeedbackController {
  progress: KataProgress;
  report(correct: boolean): void;
}

export function setupFeedback(container: HTMLElement, kataId: string, hints: string[]): FeedbackController {
  const progress = getProgress(kataId);

  const ariaLive = document.createElement('p');
  ariaLive.className = 'feedback';
  ariaLive.setAttribute('aria-live', 'polite');
  container.appendChild(ariaLive);

  const hintsSection = document.createElement('div');
  hintsSection.className = 'hints';
  container.appendChild(hintsSection);

  if (progress.solved) {
    ariaLive.textContent = '✓ Solved';
    ariaLive.classList.add('feedback-correct');
  }

  function renderHints(): void {
    hintsSection.innerHTML = '';
    for (let i = 0; i < progress.hintsRevealed; i++) {
      const p = document.createElement('p');
      p.className = 'hint';
      p.textContent = `Hint ${i + 1}: ${hints[i]}`;
      hintsSection.appendChild(p);
    }
    if (progress.attempts >= 1 && progress.hintsRevealed < hints.length) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Reveal hint';
      btn.addEventListener('click', () => {
        progress.hintsRevealed++;
        setProgress(kataId, progress);
        renderHints();
      });
      hintsSection.appendChild(btn);
    }
  }

  function report(correct: boolean): void {
    if (correct) {
      progress.solved = true;
      ariaLive.textContent = '✓ Correct!';
      ariaLive.classList.remove('feedback-incorrect');
      ariaLive.classList.add('feedback-correct');
    } else {
      progress.attempts++;
      ariaLive.textContent = '✗ Incorrect, try again.';
      ariaLive.classList.remove('feedback-correct');
      ariaLive.classList.add('feedback-incorrect');
    }
    setProgress(kataId, progress);
    renderHints();
  }

  renderHints();

  return { progress, report };
}
