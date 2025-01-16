import {ChangeDetectorRef, Component, EventEmitter, HostBinding, Output, ViewChild} from '@angular/core';
import {
  BlAction, BlBasicObject,
  BlComponentConfig,
  BlDataTableFilters, BlTableColumn, BlTableComponent, BlTableConfig,
  BlTableEvent,
  BlTableGlobalParamRight, BlTableSource,
  BlTextFieldComponentType, IconClassEnum
} from "@esedit-md/shared-ui";
import { MatTableDataSource } from '@angular/material/table';
import {FormControl, FormGroup} from "@angular/forms";
import {ACTION_DEACTIVATE} from "../../components/bl-text-field-sample/ButtonsEvent";
import {getButtonInstance} from "../../components/tables-samples/bl-datatable-sample/bl-factory-action-button";
import {ToasterService} from "@bl/shared";
import {TranslateService} from "@ngx-translate/core";
import {StaticBddService} from "../../../services/static-bdd.service";
import {LayoutService} from "@bl/bl-app-layout";
import {Location} from "@angular/common";


@Component({
  selector: 'bl-table-with-right-panel-75-percent-sample',
  templateUrl: './bl-table-with-right-panel-75-percent-sample.component.html',
  styleUrls: ['./bl-table-with-right-panel-75-percent-sample.component.scss'],
})
export class BlTableWithRightPanel75PercentSampleComponent {
  @HostBinding('style.flex-grow') flexGrow = '1';

  @Output() cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('tableComponent')
  public tableComponent: BlTableComponent;
  public config: BlTableConfig;
  public formGroup: FormGroup<{
    id: FormControl<string | number | null>;
    nom: FormControl<number | string | null>;
    prenom: FormControl<string | number | null>;
    email: FormControl<string | number | null>;
    service: FormControl<string | number | null>
  }>;
  filterComponentsConfig: BlComponentConfig[] = [];
  private datasource: MatTableDataSource<any>;
  private actionDeactivate = getButtonInstance(ACTION_DEACTIVATE);
  private refreshEvent = new EventEmitter<BlDataTableFilters>();
  private rowClickEvent = new EventEmitter<any>();
  private addEvent = new EventEmitter();
  private openRightPanelEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  public pageIcon: IconClassEnum = IconClassEnum.layout;
  public pageTitle: string;
  public openAction: BlAction = {};
  public listData: BlBasicObject[] = [];
  actionsList: BlAction[] = [];

  public showSearchField = true;
  public compareObject: ((a: any, b: any) => boolean) | undefined | null;
  public defaultFilterValue: any;
  public buttonActions: BlAction[] = [];

  constructor(private toasterService: ToasterService,
              private translateService: TranslateService,
              private staticBddService: StaticBddService,
              private changeDetectorRef: ChangeDetectorRef,
              private layoutService: LayoutService,
              private location: Location) {
    this.addLoadDataEvent();
    this.datasource = new MatTableDataSource<any>();
    //Initialiser les champs qui correspondra au données
    this.initTableFormGroup();
    //Définition de l'action du chargement des données à afficher dans le tableau
    // Action
    this.getGroupedButtonActions();
    this.initTableConfig();
    this.initData();
    this.configureAddEvent();
    this.configureRowClick();
    this.initTableConfig();
  }

  ngOnInit() {
    this.pageTitle = this.translateService.instant(
      'pages.templates.table-with-right-panel-75-percent.sampleTitle'
    );
  }

  /**
   *
   * @param obj1
   * @param obj2
   * Cette fonction permet de décider si deux element sont égaux , une comparaison par contenu
   * (lors de la pagination chaque fois on aura des nouveau objet avec des nouveaux address mémoire si on fait appelle
   * au back donc cette fonction est obligatoire dans ce cas
   */
  public comparing(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

  /*

   /**
   * RECUPERER LA CONFIGURATION DE TOUS LES COLUMNS DU TABLEAU
   */
  public getTableColumnsDefinition(): BlTableColumn[] {

    return [
      {
        name: 'id',
        value: this.translateService.instant('sample.datatable.header.matricule'),
        align: 'left',
        width: '10%'
      },
      {
        name: 'nom',
        labelSelected: this.translateService.instant('sample.datatable.header.selected'),
        value: this.translateService.instant('sample.datatable.header.lastname'),
        align: 'left',
        width: '30%'
      },
      {
        name: 'prenom',
        value: this.translateService.instant('sample.datatable.header.firstname'),
        align: 'left',
        width: '20%'
      },
      {
        name: 'service',
        value: this.translateService.instant('sample.datatable.header.department'),
        align: 'left',
        width: '15%'
      },
      {
        name: 'email',
        value: this.translateService.instant('sample.datatable.header.mail'),
        align: 'left',
        width: '15%'
      }
    ];
  }

  /**
   *
   * @private
   * On définit l'objet qui vas encapsuler les champs qu'on affiche
   */
  private initTableFormGroup() {
    this.formGroup = new FormGroup({
      id: new FormControl<BlTextFieldComponentType>(null),
      nom: new FormControl<BlTextFieldComponentType>(null),
      prenom: new FormControl<BlTextFieldComponentType>(null),
      email: new FormControl<BlTextFieldComponentType>(null),
      service: new FormControl<BlTextFieldComponentType>(null)
    });
    this.filterComponentsConfig.push({
      fieldName: 'id',
      label: 'sample.datatable.header.matricule',
      required: false
    });
    this.filterComponentsConfig.push({
      fieldName: 'nom',
      label: 'sample.datatable.header.lastname'
    } as BlComponentConfig);
    this.filterComponentsConfig.push({
      fieldName: 'prenom',
      label: 'sample.datatable.header.firstname'
    } as BlComponentConfig);
    this.filterComponentsConfig.push({
      fieldName: 'email',
      label: 'sample.datatable.header.mail'
    } as BlComponentConfig);
    this.filterComponentsConfig.push({
      fieldName: 'service',
      label: 'sample.datatable.header.service'
    } as BlComponentConfig);

    console.log(this.filterComponentsConfig);
  }

  // faire remplir le formulaire de panneau avec les données de la ligne
  public fillFormWithRowData(rowData: any) {
    const columnDefinitions = this.getTableColumnsDefinition();

    for (const column of columnDefinitions) {
      const columnName = column.name;
      const columnValue = rowData[columnName];

      if (this.formGroup.controls[columnName]) {
        this.formGroup.controls[columnName].setValue(columnValue);
      }
    }
  }

  /**
   *
   * @private
   * Configurer L'action qui sera déclancher lors du clique sur une ligne du tableau
   */
  private configureRowClick() {
    this.rowClickEvent.subscribe((rowData) => {
      this.fillFormWithRowData(rowData);
      console.log(rowData.nom);
      this.openRightPanelEventEmitter.emit();
    });
  }

  /**
   *
   * @private
   * Configurer l'action qui sera éxecuter lors du clique sur le button ajouter
   */
  private configureAddEvent() {
    this.addEvent.subscribe(() => {
      this.formGroup.reset();
      // Emit an event to open the right panel
      this.openRightPanelEventEmitter.emit();
    });
  }

  /**
   *
   * @private
   * Définition des buttons qui doit être afficher en haut du tableau
   */
  private getGroupedButtonActions() {

    this.actionDeactivate.eventEmitter = new EventEmitter();
    this.actionDeactivate.icon = undefined;
    this.actionDeactivate.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.deactivate'));
// ADD OPEN Panel BUTTON
    this.openRightPanelEventEmitter.subscribe(() => {
      this.open75RightPanel();
    });
    return [this.openAction];
  }

  /**
   *
   * cette fonction permet d'afficher le panneau de droite
   */
  private open75RightPanel() {
    this.layoutService.openContentRightPanel();
  }

  /**
   *
   * @private
   * Définition de l'action à éxecuter lorsqu'on cliquer
   * sur le button actualiser ou lorsqu'on paginer ou une recherche
   */
  private addLoadDataEvent() {
    // EventEmitter
    this.refreshEvent.subscribe((value: BlDataTableFilters) => {
      this.updateList(value);
    });
  }

  /**
   *
   * Définition de la configuration globale du tableau column + action + caracteristique configuration
   */
  private initTableConfig() {
    // Config
    this.config = {
      globalParam: {
        right: this.getGlobalParamRight()
      },
      groupedActionButton: this.getGroupedButtonActions(),
      data: {
        column: this.getTableColumnsDefinition(),
        dataCount: this.datasource?.data ? 0 : this.datasource?.data.length,
        datasource: this.datasource,
        pageSizeOption: [25, 50, 100, 500, 6000],
        defaultSort: { active: 'id', direction: 'asc' }
      },
      event: this.getTableEvents()
    };
  }

  /**
   *
   * Configuration des comportements spécifique dans la table telle que l'affichage des buttons d'action
   * Afficher le filter ou pas
   * Afficher la column action
   * Pouvoir selection un element dans le tableau
   * Permet l'ajout d'une nouvelle entree
   * afficher le champs de recherche
   * Afficher ou cacher le paginatror
   */
  private getGlobalParamRight(): BlTableGlobalParamRight {
    return {
      groupActionButton: false, // action button at the top of header
      expandableRows: true, // is the table having expandable rows
      filter: false, // because no exist filter
      columnAction: true, // right to have action column
      selectOne: false, //- right to select one row
      selectAll: false, //-- right to select all the row of the display page
      search: true, //-- right to have rapid search
      add: true, //-- right to add a new element with plus button
      hidePaginator: false, //-- right to activate/deactivate paginator
      hideRefresh: false // right to hide/display refresh button
    };
  }

  /**
   * Configurer les actions pour une execution normal du tableau
   * refresh : l'event emitter qui permet de récuper le contenu du tableau
   * clickRow : l'event emitter qui s'exucutera lors du clique sur une ligne du tableau
   * add : l'event emitter qui s'exuctera lorsqu'on click sur le button d'ajout d'une nouvelle ligne
   * selectAll : l'event emitter qui sera executer si on click sur la case à caucher pour séléctionner tous les élements
   *
   */
  private getTableEvents(): BlTableEvent {
    return {
      refresh: this.refreshEvent,
      clickRow: this.rowClickEvent,
      add: this.addEvent
    };
  }

  /**
   *
   * @private
   * La fonction qui sera appellé lors du chargement initiale de la page
   * initialise la configuration du paginateur et récuperer la liste
   */
  private initData(): void {
    const pageSize = this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.dataCount : 50;
    const dataTableFilters: BlDataTableFilters = {
      filters: null,
      paginatorValues: {
        length: this.datasource?.data?.length ? 0 : this.datasource?.data?.length,
        pageIndex: 0,
        pageSize: this.config?.data?.pageSizeOption?.length && this.config?.data?.pageSizeOption?.length > 0 && !this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.pageSizeOption[0] : pageSize!,
        previousPageIndex: 0
      },
      sortValues: null,
      search: null
    };
    this.updateList(dataTableFilters);
  }

  /**
   *
   * @param dataTableFilters
   * @private
   * C'est la fonction qui permet de récupérer les données du service en assurant la pagination
   * et la recherche
   */
  private updateList(dataTableFilters: BlDataTableFilters): void {
    if (!dataTableFilters.paginatorValues && this.config?.data?.pageSizeOption) {
      dataTableFilters.paginatorValues = {
        length: 0, pageIndex: 0, previousPageIndex: 0,
        pageSize: this.config?.data?.pageSizeOption[0]
      };
    }
    const result = this.staticBddService.getListUser(dataTableFilters);
    this.datasource.data = result.data;
    this.config.data.dataCount = result.dataCount;
    // Add an attribute to each archived row to make table rows expandable
    this.datasource.data = this.datasource.data.map((row: BlTableSource) => ({
      ...row,
      isExpanded: false
    }));
    this.changeDetectorRef.markForCheck();
  }

  // le comportement des deux boutons enregistrer et annuler
  public doOnClickValidate(): void {
    this.toasterService.success('sample.datatable.event.validate');
    this.layoutService.closeContentRightPanel();
    this.formGroup.reset();
  }
  public doOnClickRollback(): void {
    this.layoutService.closeContentRightPanel();
    this.formGroup.reset();
  }

  protected readonly IconClassEnum = IconClassEnum;

  onCloseBtn() {
    this.location.back();
  }
}
