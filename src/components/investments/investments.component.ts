import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InvestmentPlan {
  name: string;
  investmentRange: string;
  roi: string;
  term: string;
  imageUrl: string;
  benefits: string[];
}

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class InvestmentsComponent {
  plans: InvestmentPlan[] = [
    {
      name: 'Silver Edge',
      investmentRange: '$1,000+',
      roi: '7%',
      term: '12mo',
      imageUrl: 'https://picsum.photos/seed/silver/600/400',
      benefits: ['Market Entry Access', 'Quarterly Reports', 'Standard Support']
    },
    {
      name: 'Gold Advance',
      investmentRange: '$10,000 – $49,000',
      roi: '12%',
      term: '18mo',
      imageUrl: 'https://picsum.photos/seed/gold/600/400',
      benefits: ['Priority Asset Allocation', 'Bi-Annual Reviews', 'Dedicated Advisor']
    },
    {
      name: 'Platinum Executive',
      investmentRange: '$50,000 – $249,000',
      roi: '18%',
      term: '24mo',
      imageUrl: 'https://picsum.photos/seed/platinum/600/400',
      benefits: ['Exclusive Fund Access', 'Personalized Strategy', 'VIP Event Invites']
    },
    {
      name: 'Diamond Capital',
      investmentRange: '$250,000+',
      roi: 'Custom',
      term: 'Contract',
      imageUrl: 'https://picsum.photos/seed/diamond/600/400',
      benefits: ['Board-level Insights', 'Direct Co-investment', 'Bespoke Opportunities']
    }
  ];
}
