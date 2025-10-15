import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { ServicesComponent } from './components/services/services.component';
import { AiVisionComponent } from './components/ai-vision/ai-vision.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    InvestmentsComponent,
    ServicesComponent,
    AiVisionComponent,
    FooterComponent
  ]
})
export class AppComponent {}
