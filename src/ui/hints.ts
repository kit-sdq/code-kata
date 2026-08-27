import { getProgress, setProgress, type KataProgress } from './progress.ts';
import { t } from './i18n.ts';

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
  ariaLive.setAttribute('role', 'status');
  ariaLive.setAttribute('aria-live', 'polite');
  container.appendChild(ariaLive);

  const hintsSection = document.createElement('div');
  hintsSection.className = 'hints';
  container.appendChild(hintsSection);

  // Separate, persistent live region for hint reveals: hintsSection itself is fully
  // rebuilt on every reveal (all prior hints + the button), so making it live would
  // re-announce the whole list each time. This announces only the newly revealed hint.
  const hintAnnounce = document.createElement('p');
  hintAnnounce.className = 'sr-only';
  hintAnnounce.setAttribute('role', 'status');
  hintAnnounce.setAttribute('aria-live', 'polite');
  container.appendChild(hintAnnounce);

  if (progress.solved) {
    ariaLive.textContent = t('feedback.solved');
    ariaLive.classList.add('feedback-correct');
  }

  function renderHints(): void {
    hintsSection.innerHTML = '';
    for (let i = 0; i < progress.hintsRevealed; i++) {
      const p = document.createElement('p');
      p.className = 'hint';
      p.textContent = `${t('hint.item', { n: i + 1 })}: ${hints[i]}`;
      hintsSection.appendChild(p);
    }
    if (progress.attempts >= 1 && progress.hintsRevealed < hints.length) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = t('hint.reveal');
      btn.addEventListener('click', () => {
        progress.hintsRevealed++;
        setProgress(kataId, progress);
        renderHints();
        hintAnnounce.textContent = `${t('hint.announced', { n: progress.hintsRevealed })}: ${hints[progress.hintsRevealed - 1]}`;
      });
      hintsSection.appendChild(btn);
    }
  }

  function report(correct: boolean): void {
    if (correct) {
      progress.solved = true;
      ariaLive.textContent = t('feedback.correct');
      ariaLive.classList.remove('feedback-incorrect');
      ariaLive.classList.add('feedback-correct');
    } else {
      progress.attempts++;
      ariaLive.textContent = t('feedback.incorrect');
      ariaLive.classList.remove('feedback-correct');
      ariaLive.classList.add('feedback-incorrect');
    }
    setProgress(kataId, progress);
    renderHints();
  }

  renderHints();

  return { progress, report };
}
