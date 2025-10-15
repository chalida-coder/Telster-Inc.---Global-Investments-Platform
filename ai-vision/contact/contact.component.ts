import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: '../../../contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  isSubmitting = signal(false);
  submissionMessage = signal<string | null>(null);

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submissionMessage.set(null);

    // Simulate an API call
    setTimeout(() => {
      console.log('Form Submitted:', this.contactForm.value);
      this.submissionMessage.set('Thank you for your message. We will get back to you shortly.');
      this.isSubmitting.set(false);
      this.contactForm.reset();
      // Un-touch the fields
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsUntouched();
      });
    }, 1500);
  }

  // Helper getters for template
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
}