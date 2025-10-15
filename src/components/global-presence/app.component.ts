import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { ServicesComponent } from './components/services/services.component';
import { AiVisionComponent } from '../ai-vision/ai-vision.component';
import { MissionComponent } from './components/mission/mission.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalPresenceComponent } from './components/global-presence/global-presence.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    InvestmentsComponent,
    GlobalPresenceComponent,
    ServicesComponent,
    AiVisionComponent,
    MissionComponent,
    ContactComponent,
    FooterComponent
  ]
})
export class AppComponent {}