import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, effect } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as d3 from 'd3';

interface Hub {
  name: string;
  coordinates: [number, number];
  sector: 'FinTech' | 'Energy' | 'Mobility' | 'AI';
  description: string;
}

interface TooltipData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-global-presence',
  templateUrl: './global-presence.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styles: [`
    .map-path {
      stroke: #4a5568;
      stroke-width: 0.5px;
      fill: #2d3748;
      transition: fill 0.3s ease;
    }
    .map-path:hover {
      fill: #4a5568;
    }
    .hub-point {
      cursor: pointer;
      stroke: rgba(255, 255, 255, 0.5);
      stroke-width: 1px;
      transition: r 0.3s ease, opacity 0.3s ease;
    }
    .hub-point:hover {
      opacity: 1;
    }
  `]
})
export class GlobalPresenceComponent implements AfterViewInit, OnDestroy {
  mapContainer = viewChild.required<ElementRef>('mapContainer');
  tooltip = viewChild.required<ElementRef>('tooltip');
  tooltipData = signal<TooltipData>({ name: '', description: '' });
  activeFilter = signal<Hub['sector'] | null>(null);

  private isBrowser: boolean;
  private resizeObserver: ResizeObserver | null = null;
  private svg: any;
  private hubSelection: any;

  private hubs: Hub[] = [
    { name: 'Silicon Valley AI Hub', coordinates: [-122.4194, 37.7749], sector: 'AI', description: 'Global AI R&D and Asset Recovery.' },
    { name: 'Shanghai Gigafactory', coordinates: [121.4737, 31.2304], sector: 'Energy', description: 'Powerwall & Megapack manufacturing.' },
    { name: 'Berlin Mobility R&D', coordinates: [13.4050, 52.5200], sector: 'Mobility', description: 'Advanced electric vehicle engineering.' },
    { name: 'Singapore FinTech Center', coordinates: [103.8198, 1.3521], sector: 'FinTech', description: 'Secure Wire Wallet operations.' },
    { name: 'Tokyo Robotics Lab', coordinates: [139.6917, 35.6895], sector: 'AI', description: 'Next-gen robotics and automation.' },
    { name: 'Austin Energy Hub', coordinates: [-97.7431, 30.2672], sector: 'Energy', description: 'US clean energy grid management.' },
  ];

  private sectorColors: Record<Hub['sector'], string> = {
    'FinTech': '#2563eb', // Blue
    'Energy': '#16a34a', // Green
    'Mobility': '#c026d3', // Fuchsia
    'AI': '#f59e0b' // Amber
  };
  
  legend = Object.entries(this.sectorColors).map(([name, color]) => ({ name: name as Hub['sector'], color }));

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      if (this.hubSelection) {
        this.updateHubVisibility();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.drawMap();
      this.resizeObserver = new ResizeObserver(() => {
        this.drawMap();
      });
      this.resizeObserver.observe(this.mapContainer().nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  setFilter(sector: Hub['sector']): void {
    this.activeFilter.set(this.activeFilter() === sector ? null : sector);
  }

  clearFilter(): void {
    this.activeFilter.set(null);
  }

  private updateHubVisibility(): void {
    const currentFilter = this.activeFilter();
    this.hubSelection
      .transition()
      .duration(400)
      .style('opacity', (d: Hub) => (currentFilter === null || d.sector === currentFilter) ? 1 : 0)
      .style('pointer-events', (d: Hub) => (currentFilter === null || d.sector === currentFilter) ? 'auto' : 'none')
      .attr('r', (d: Hub) => (currentFilter === null || d.sector === currentFilter) ? 5 : 4);
  }

  private async drawMap(): Promise<void> {
    const container = this.mapContainer().nativeElement;
    if (!container) return;

    d3.select(container).select('svg').remove();

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.svg = d3.select(container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('display', 'block');

    const projection = d3.geoMercator()
      .scale(width / 2 / Math.PI * 0.9)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    try {
      // FIX: Explicitly type `world` as `any` because `d3.json` returns a Promise that resolves to `unknown`. This allows accessing the `features` property without a TypeScript error.
      const world: any = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
      
      this.svg.append('g')
        .selectAll('path')
        .data(world.features)
        .join('path')
        .attr('d', path)
        .attr('class', 'map-path');

      this.hubSelection = this.svg.append('g')
        .selectAll('circle')
        .data(this.hubs)
        .join('circle')
        .attr('cx', (d: Hub) => projection(d.coordinates)[0])
        .attr('cy', (d: Hub) => projection(d.coordinates)[1])
        .style('fill', (d: Hub) => this.sectorColors[d.sector])
        .attr('class', 'hub-point')
        .on('mouseover', (event: MouseEvent, d: Hub) => {
          this.tooltipData.set({ name: d.name, description: d.description });
          const tooltipEl = this.tooltip().nativeElement;
          tooltipEl.style.opacity = '1';
          // FIX: Cast event.currentTarget to Element to satisfy d3.select's type requirement.
          d3.select(event.currentTarget as Element).transition().duration(200).attr('r', 8);
        })
        .on('mousemove', (event: MouseEvent) => {
          const tooltipEl = this.tooltip().nativeElement;
          tooltipEl.style.left = `${event.pageX + 15}px`;
          tooltipEl.style.top = `${event.pageY - 15}px`;
        })
        .on('mouseout', (event: MouseEvent, d: Hub) => {
           const tooltipEl = this.tooltip().nativeElement;
           tooltipEl.style.opacity = '0';
           const currentFilter = this.activeFilter();
           const targetRadius = (currentFilter === null || d.sector === currentFilter) ? 5 : 4;
           // FIX: Cast event.currentTarget to Element to satisfy d3.select's type requirement.
           d3.select(event.currentTarget as Element).transition().duration(200).attr('r', targetRadius);
        });

      this.updateHubVisibility();

    } catch (error) {
      console.error('Error loading or drawing map data:', error);
      container.innerText = 'Failed to load map.';
    }
  }
}