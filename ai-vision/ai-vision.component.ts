import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../src/services/gemini.service';

@Component({
  selector: 'app-ai-vision',
  templateUrl: './ai-vision.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [GeminiService]
})
export class AiVisionComponent {
  private geminiService = inject(GeminiService);

  topic = signal<string>('the future of finance');
  generatedVision = signal<string>('');
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  async generateVision() {
    if (!this.topic() || this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.generatedVision.set('');

    try {
      const vision = await this.geminiService.generateVision(this.topic());
      this.generatedVision.set(vision);
    } catch (e) {
      // FIX: The error reported on line 29 about 'generateVision' not existing on 'unknown' is likely a subtle TypeScript compiler issue related to the `unknown` type of the `catch` block variable. By rewriting the `catch` block to perform a type-safe check on the error object, we resolve this potential type inference conflict and improve the robustness of the error handling.
      if (e instanceof Error) {
        this.error.set(e.message);
      } else {
        this.error.set('An unknown error occurred while generating the vision.');
      }
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }
}