import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
    icon: string;
    title: string;
    description: string;
    cta: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ServicesComponent {
    services: Service[] = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-vip-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l1.414-1.414m10.05 10.05l1.414-1.414M18.364 5.636l-1.414 1.414m-10.05 10.05l-1.414 1.414M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>`,
            title: 'AI Asset Recovery',
            description: 'Digital asset restoration and compliance audit logs powered by our proprietary AI.',
            cta: 'Learn More'
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-vip-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`,
            title: 'Secure Wire Wallet',
            description: 'Multi-currency transfers with institutional-grade security and AI-powered fraud detection.',
            cta: 'Start Now'
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-vip-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
            title: 'Capsule Moveable Homes',
            description: 'Sustainable, high-tech living spaces designed for the future of smart mobility.',
            cta: 'Request Demo'
        }
    ];
}
