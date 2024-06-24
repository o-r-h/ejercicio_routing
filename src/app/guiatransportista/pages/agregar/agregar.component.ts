import { ChangeDetectionStrategy, Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteDataService } from 'src/data/autocomplete/autocomplete-data.service';

import { Autocomplete } from 'src/app/models/autocomplete.model';
import { Sieve } from 'src/app/models/sieve.model';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'guiatransportista-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],

})



export class AgregarGuiaTransportistaComponent {
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger | undefined;
  genForm: FormGroup;
  submitted = false;
  isEditMode: boolean = false;
  itemId: number | null = null;

  //autocomplete
  stateCtrlCliente = new FormControl();
  listaEntidadCliente: Autocomplete[] = [];
  filteredOptionsCliente: Observable<Autocomplete[]> | undefined;

  stateCtrlConcesionario = new FormControl();
  listaEntidadConcesionario: Autocomplete[] = [];
  filteredOptionsConcesionario: Observable<Autocomplete[]> | undefined;

  stateCtrlChofer = new FormControl();
  listaChofer: Autocomplete[] = [];
  filteredOptionsChofer: Observable<Autocomplete[]> | undefined;

  stateCtrlTractor = new FormControl();
  listaTractor: Autocomplete[] = [];
  filteredOptionsTractor: Observable<Autocomplete[]> | undefined;

  stateCtrlCarreta = new FormControl();
  listaCarreta: Autocomplete[] = [];
  filteredOptionsCarreta: Observable<Autocomplete[]> | undefined;

  stateCtrlUbigeoOrigen = new FormControl();
  listaUbigeoOrigen: Autocomplete[] = [];
  filteredOptionsUbigeoOrigen: Observable<Autocomplete[]> | undefined;

  stateCtrlUbigeoDestino = new FormControl();
  listaUbigeoDestino: Autocomplete[] = [];
  filteredOptionsUbigeoDestino: Observable<Autocomplete[]> | undefined;
  //fin autocomplete

  //temporales para los autocomplete
  idEntidadConcesionarioTemp: number =0;
  idEntidadclienteTemp: number =0;
  idChoferTemp: number=0;
  idTractorTemp: number=0;
  idCarretaTemp: number= 0;
  idUbigeoDestino: number=0;
  idUbigeoOrigen: number=0;


  //logica para autocomplete dinamico
  // autocompleteControl = new FormControl();
  //filteredOptions: Autocomplete[] = [];



  sieveEntidad: Sieve = { filters: '', pageSize: null, page: null, sorts: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private autocompleteService: AutocompleteDataService

  ) {
    this.genForm = this.fb.group({
      serie: ['', [Validators.required, Validators.max(99999999999)]],
      numero: ['', [Validators.required, Validators.max(99999999999)]],
      idEntidadCliente: ['', [Validators.required, Validators.max(99999999999)]],
      //razonSocial: string;
      idEntidadConcesionario: ['', [Validators.required, Validators.max(99999999999)]],
      fecha: ['', Validators.required],
      fechaTraslado: ['', Validators.required],
      idUbigeoOrigen: ['', [Validators.required, Validators.max(99999999999)]],
      //ubigeoOrigen: string;
      idUbigeoDestino: ['', [Validators.required, Validators.max(99999999999)]],
      //ubigeoDestino: string;
      direccionOrigen: ['', Validators.required],
      direccionDestino: ['', Validators.required],
      idChofer: ['', [Validators.required, Validators.max(99999999999)]],
      //chofer: string;
      //datosChofer: string;
      idTransporteTractor: ['', [Validators.required, Validators.max(99999999999)]],
      //transporteTractor: string;
      idTransporteCarreta: ['', [Validators.required, Validators.max(99999999999)]],
      //transporteCarreta: string;
      peso: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.llenarClienteAutocomplete();
    this.llenarConcesionarioAutocomplete();
    this.llenarCarretaAutocomplete();
    this.llenarChoferAutocomplete();
    this.llenarTractorAutocomplete();
    this.llenarUbigeoOrigenAutocomplete();
    this.llenarUbigeoDestinoAutocomplete();

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsCliente = this.stateCtrlCliente.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesCliente(value))
    );

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsConcesionario = this.stateCtrlConcesionario.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesConcesionario(value))
    );

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsCarreta = this.stateCtrlCarreta.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesCarreta(value))
    );

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsTractor = this.stateCtrlTractor.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesTractor(value))
    );

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsChofer = this.stateCtrlChofer.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesChofer(value))
    );

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsUbigeoOrigen = this.stateCtrlUbigeoOrigen.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesUbigeoOrigen(value))
    );

    this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsUbigeoDestino = this.stateCtrlUbigeoDestino.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesUbigeoDestino(value))
    );

    //logica para autocomplete dinamico
    // this.autocompleteControl.valueChanges
    //   .pipe(
    //     debounceTime(50), // Espera 200ms después de que el usuario deja de escribir
    //     distinctUntilChanged(), // Solo emite si el valor es diferente del anterior
    //     switchMap(value => this.autocompleteService.getAllEntidades(this.setFilterEntidad(value)))
    //   )
    //   .subscribe(data => {
    //     this.filteredOptions = data;
    //   });
  }

  //filtros autocomplete
  private _filterStatesCliente(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("filter cliente", value);
    return this.listaEntidadCliente.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesConcesionario(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("fc",filterValue);
    return this.listaEntidadConcesionario.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)

    );
  }

  private _filterStatesCarreta(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("filter carreta", value);
    return this.listaCarreta.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesTractor(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("filter tractor", value);
    return this.listaTractor.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesChofer(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("filter Chofer", value);
    return this.listaChofer.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesUbigeoOrigen(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("filter Ubigeo", value);
    return this.listaUbigeoOrigen.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesUbigeoDestino(value: string): Autocomplete[] {
    const filterValue = value;
    console.log("filter Ubigeo", value);
    return this.listaUbigeoOrigen.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }
//fin filtros autocomplete

//display autocomplete ver el valormostrar en el input
  displayFnCliente(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }
  displayFnConcesionario(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }

  displayFnChofer(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }

  displayFnTractor(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }
  displayFnCarreta(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }

  displayFnUbigeoOrigen(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }

  displayFnUbigeoDestino(option: Autocomplete): string {
    return option ? option.valorMostrar : '';
  }
//fin display autocomplete

//option selected para asignar los valores temporales
  optionSelectedCliente(option: Autocomplete) {
    if (option) {
      this.idEntidadclienteTemp = option.id;
    }
  }

  optionSelectedConcesionario(option: Autocomplete) {
    if (option) {
      this.idEntidadConcesionarioTemp = option.id; // this.genForm.get('idEntidadConcesionario')!.setValue(option.id);
    }
  }
  optionSelectedChofer(option: Autocomplete) {
    if (option) {
      this.idChoferTemp = option.id;
    }
  }

  optionSelectedTractor(option: Autocomplete) {
    if (option) {
      this.idTractorTemp = option.id;
    }
  }
  optionSelectedCarreta(option: Autocomplete) {
    if (option) {
      this.idCarretaTemp = option.id;
    }
  }

  optionSelectedUbigeoDestino(option: Autocomplete) {
    if (option) {
      this.idUbigeoDestino = option.id;
    }
  }

  optionSelectedUbigeoOrigen(option: Autocomplete) {
    if (option) {
      this.idUbigeoOrigen = option.id;
    }
  }


  //llenar autocompletes
  llenarClienteAutocomplete() {
    this.autocompleteService.getAllEntidades(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaEntidadCliente = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  llenarConcesionarioAutocomplete() {
    this.autocompleteService.getAllEntidades(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaEntidadConcesionario = data;

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  llenarChoferAutocomplete() {
    this.autocompleteService.getAllChoferes(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaChofer = data;
        console.log(this.listaChofer);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  llenarTractorAutocomplete() {
    this.autocompleteService.getAllTractor(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaTractor = data;

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  llenarCarretaAutocomplete() {
    this.autocompleteService.getAllCarreta(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaCarreta = data;

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  llenarUbigeoOrigenAutocomplete() {
    this.autocompleteService.getAllUbigeo(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaUbigeoOrigen = data;

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  llenarUbigeoDestinoAutocomplete() {
    this.autocompleteService.getAllUbigeo(this.sieveEntidad).subscribe(
      (data: Autocomplete[]) => {
        this.listaUbigeoDestino= data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  //fin llenar autocompletes







  //  setFilterEntidad(valor:string){
  //   this.sieveEntidad.filters = "valorAgrupado@=*" + valor;
  //   return this.sieveEntidad;
  //  }

  // selectOption(option: Autocomplete) {
  //   this.autocompleteControl.setValue(option.valorMostrar);
  //   this.filteredOptions = [];
  // }

  // Botones formulario
  onSubmit() {

    console.log("cli", this.genForm.get('idEntidadCliente')!.value);
    console.log("con", this.genForm.get('idEntidadConcesionario')!.value);

    console.log("idEntidadConcesionarioTemp", this.idEntidadConcesionarioTemp);
    console.log("idEntidadclienteTemp", this.idEntidadclienteTemp);

    if ( this.idEntidadConcesionarioTemp === this.idEntidadclienteTemp){
      Swal.fire(
        'Información!',
        'Cliente y Concesionario no pueden ser iguales.',
        'warning'
      );
      return false;
    }

    if (!this.genForm.valid) {
      alert('Por favor llene todos los campos requeridos')
      return false;
    } else {
      console.log(this.genForm.value)
      //   this.saveChofer();
      return true;
    }
  }

  onBack() {
    const selectedOption = this.listaEntidadCliente.find(option => option.id = 1612);
    if (selectedOption) {
      this.stateCtrlCliente.setValue(selectedOption);
    }
    //this.stateCtrlCliente.setValue(1612);
    //this._filterStatesConcesionarioEdicion(1612);
    // Lógica para el botón de regresar
    //this.router.navigate(['guiatransportista/listado']);
  }

}
