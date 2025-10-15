import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

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
      this.error.set('Failed to generate vision. Please try again.');
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }
}
