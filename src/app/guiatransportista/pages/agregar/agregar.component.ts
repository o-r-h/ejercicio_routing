

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
import { GuiaTransportistaDataService } from 'src/data/guiatransportista/guiatransportista-data.service';
import { GuiaTransportista } from 'src/app/models/guiatransportista.model';

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
  stateCtrlCliente = new  FormControl(null, Validators.required);
  listaEntidadCliente: Autocomplete[] = [];
  filteredOptionsCliente: Observable<Autocomplete[]> | undefined;

  stateCtrlConcesionario = new FormControl();
  listaEntidadConcesionario: Autocomplete[] = [];
  filteredOptionsConcesionario: Observable<Autocomplete[]> | undefined;

  stateCtrlChofer = new  FormControl(null, Validators.required);
  listaChofer: Autocomplete[] = [];
  filteredOptionsChofer!: Observable<Autocomplete[]>;

  stateCtrlTractor  = new  FormControl(null, Validators.required);
  listaTractor: Autocomplete[] = [];
  filteredOptionsTractor: Observable<Autocomplete[]> | undefined;

  stateCtrlCarreta = new FormControl(null, Validators.required);
  listaCarreta: Autocomplete[] = [];
  filteredOptionsCarreta: Observable<Autocomplete[]> | undefined;

  stateCtrlUbigeoOrigen = new FormControl(null, Validators.required);
  listaUbigeoOrigen: Autocomplete[] = [];
  filteredOptionsUbigeoOrigen: Observable<Autocomplete[]> | undefined;

  stateCtrlUbigeoDestino = new FormControl(null, Validators.required);
  listaUbigeoDestino: Autocomplete[] = [];
  filteredOptionsUbigeoDestino: Observable<Autocomplete[]> | undefined;
  //fin autocomplete

  //temporales para los autocomplete
  idEntidadConcesionarioTemp: number =0;
  idEntidadclienteTemp: number =0;
  idChoferTemp: number=0;
  idTractorTemp: number=0;
  idCarretaTemp: number= 0;
  idUbigeoDestinoTemp: number=0;
  idUbigeoOrigenTemp: number=0;


  //logica para autocomplete dinamico
  // autocompleteControl = new FormControl();
  //filteredOptions: Autocomplete[] = [];



  sieveEntidad: Sieve = { filters: '', pageSize: null, page: null, sorts: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guiaTransportistaDataService: GuiaTransportistaDataService,
    private autocompleteService: AutocompleteDataService,



  ) {
    this.genForm = this.fb.group({
      serie: ['', [Validators.required, Validators.max(99999999999)]],
      numero: ['', [Validators.required, Validators.max(99999999999)]],
      idEntidadCliente: this.stateCtrlCliente,
      //razonSocial: string;
      idEntidadConcesionario: this.stateCtrlConcesionario,
      fecha: ['', Validators.required],
      fechaTraslado: ['', Validators.required],
      idUbigeoOrigen: this.stateCtrlUbigeoOrigen,
      //ubigeoOrigen: string;
      idUbigeoDestino: this.stateCtrlUbigeoDestino,
      //ubigeoDestino: string;
      direccionOrigen: ['', Validators.required],
      direccionDestino: ['', Validators.required],
      //idChofer: ['', Validators.required],
      idChofer: this.stateCtrlChofer,
      //chofer: string;
      //datosChofer: string;
      idTransporteTractor: this.stateCtrlTractor,
      //transporteTractor: string;
      idTransporteCarreta: this.stateCtrlCarreta,
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

  //  this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsCliente = this.stateCtrlCliente.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesCliente(value || ''))
    );

   // this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsConcesionario = this.stateCtrlConcesionario.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesConcesionario(value|| ''))
    );

  //  this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsCarreta = this.stateCtrlCarreta.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesCarreta(value|| ''))
    );

 //   this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsTractor = this.stateCtrlTractor.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesTractor(value|| ''))
    );

   // this.sieveEntidad.filters = "valorAgrupado@=*''";

   this.filteredOptionsChofer = this.stateCtrlChofer.valueChanges.pipe(
    debounceTime(150),
    startWith(''),
    map(value => this._filterStatesChofer(value || ''))
  );


 //   this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsUbigeoOrigen = this.stateCtrlUbigeoOrigen.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesUbigeoOrigen(value|| ''))
    );

 //   this.sieveEntidad.filters = "valorAgrupado@=*''";
    this.filteredOptionsUbigeoDestino = this.stateCtrlUbigeoDestino.valueChanges.pipe(
      debounceTime(150),
      startWith(''),
      map((value) => this._filterStatesUbigeoDestino(value|| ''))
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
   // console.log("filter cliente", value);
    return this.listaEntidadCliente.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesConcesionario(value: string): Autocomplete[] {
    const filterValue = value;
   // console.log("fc",filterValue);
    return this.listaEntidadConcesionario.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)

    );
  }

  private _filterStatesCarreta(value: string): Autocomplete[] {
    const filterValue = value;
   // console.log("filter carreta", value);
    return this.listaCarreta.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesTractor(value: string): Autocomplete[] {
    const filterValue = value;
   // console.log("filter tractor", value);
    return this.listaTractor.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }



  private _filterStatesUbigeoOrigen(value: string): Autocomplete[] {
    const filterValue = value;
    //console.log("filter Ubigeo", value);
    return this.listaUbigeoOrigen.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesUbigeoDestino(value: string): Autocomplete[] {
    const filterValue = value;
   // console.log("filter Ubigeo", value);
    return this.listaUbigeoOrigen.filter((option) =>
      option.valorAgrupado.toLowerCase().includes(filterValue)
    );
  }

  private _filterStatesChofer(value: string): Autocomplete[] {
    const filterValue = value;
   // console.log("filter cliente", value);
    return this.listaChofer.filter((option) =>
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
    //console.log("displayFnChofer", option.valorMostrar);
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
      this.idEntidadConcesionarioTemp = option.id;
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
      this.idUbigeoDestinoTemp = option.id;
    }
  }

  optionSelectedUbigeoOrigen(option: Autocomplete) {
    if (option) {
      this.idUbigeoOrigenTemp = option.id;
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
      //  console.log(this.listaChofer);
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

  saveGuiaTransportista(): void {
    //if (this.userForm.valid) {
      let valorIdtemp = this.itemId !==null ? this.itemId:0;
      const guia: GuiaTransportista = {
        id                    : valorIdtemp,
        serie                 : this.genForm.get('serie')!.value,
        numero                : this.genForm.get('numero')!.value,
        idEntidadCliente      : this.retornarValor(this.genForm.get('idEntidadCliente')!.value),
        idEntidadConcesionario: this.retornarValor(this.genForm.get('idEntidadConcesionario')!.value),
        idTransporteCarreta   : this.retornarValor(this.genForm.get('idTransporteCarreta')!.value),
        idChofer              : this.retornarValor(this.genForm.get('idChofer')!.value),
        idTransporteTractor   : this.retornarValor(this.genForm.get('idTransporteTractor')!.value),
        idUbigeoDestino       : this.retornarValor(this.genForm.get('idUbigeoDestino')!.value),
        idUbigeoOrigen        : this.retornarValor(this.genForm.get('idUbigeoOrigen')!.value),
        fecha                 : '1900-01-01',//this.genForm.get('fecha')!.value,
        fechaTraslado         : this.genForm.get('fechaTraslado')!.value,
        peso                  : '0',//this.genForm.get('peso')!.value,
        estado                : 1,//this.genForm.get('estado')!.value,
        direccionDestino      : this.genForm.get('direccionDestino')!.value,
        direccionOrigen       : this.genForm.get('direccionOrigen')!.value,
        rutaXml               : '',//this.genForm.get('rutaXml')!.value,
        rutaPdf               : '',//this.genForm.get('rutaPdf')!.value,
        rutaCdr               : '',//this.genForm.get('rutaCdr')!.value,

      };

      const guiaTransP: GuiaTransportista = guia; // this.genForm.value;

      if (this.isEditMode) {
        guiaTransP.id = this.itemId !==null ? this.itemId:0;
         this.guiaTransportistaDataService.update( (this.itemId !==null ? this.itemId:0) ,guiaTransP).subscribe(
           response => {
             this.showUpdate();
           },
           error => {
            Swal.fire({
              icon: "error",
              title: "Error actualizando registro",
              text:  error,
              footer: '<a href="#">Contacte a soporte para mayor informacion</a>'
            });
           }
        );
      } else {

        this.guiaTransportistaDataService.insert(guiaTransP).subscribe(
          response => {
            this.showInsert();
          },
          error => {
            console.error('Error agregando registro', error);
            Swal.fire({
              icon: "error",
              title: "Error agregando registro",
              text:  error,
              footer: '<a href="#">Contacte a soporte para mayor informacion</a>'
            });

          }
        );
      }

  }

  showUpdate() {
    Swal.fire({
      title: 'Informacion!',
      text: 'Se actualizo el registro',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.onBack();
  }

  showInsert() {
    Swal.fire({
      title: 'Informacion!',
      text: 'Se agrego el registro',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.onBack();
  }




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

    //console.log('idEntidadConcesionario', this.idEntidadConcesionarioTemp);
    //console.log('idEntidadcliente',this.idEntidadclienteTemp);
    //console.log('idTransporteCarreta'       ,this.idCarretaTemp);
    //console.log('idTransporteTractor'       ,this.idTractorTemp);
    //console.log('idUbigeoDestino' ,this.idUbigeoDestinoTemp);
    // console.log('idUbigeoOrigen'  ,this.idUbigeoOrigenTemp);
    // console.log('idChofer'        ,this.idChoferTemp);
    // console.log('peso'            ,0);
    // console.log('fecha'           ,this.genForm.get('fechaTraslado')!.value);

     this.genForm.get('peso')?.setValue(0);
     this.genForm.get('fecha')?.setValue('2024-06-01');

    console.log('formgroup' ,this.genForm);


    if ( (this.idEntidadConcesionarioTemp !=0 && this.idEntidadConcesionarioTemp !=0)   &&   (this.idEntidadConcesionarioTemp === this.idEntidadclienteTemp)){
      Swal.fire(
        'Información!',
        'Cliente y Concesionario no pueden ser iguales.',
        'warning'
      );
     return false;
    }

    if (!this.genForm.valid) {
      alert('formulario no valido')
      console.log('formulario no valido',this.genForm);
       return false;
    } else {
      console.log('salvar');
      this.saveGuiaTransportista();
      return true;
    }


  }

//  parallenarlosSelectEnEdicion(){
//   const selectedOption = this.listaEntidadCliente.find(option => option.id = 1612);
//   if (selectedOption) {
//     this.stateCtrlCliente.setValue(selectedOption);
//   }
//  }


  private retornarValor(au:Autocomplete):number{
     return au.id;
  }

  onBack() {

    //  console.log(this.genForm);
    //   console.log(this.genForm.get('idChofer')!.value);
    //   let inchofer= this.retornarValor(this.genForm.get('idChofer')!.value);
     console.log("inchofer") ;
     const guia: GuiaTransportista = {
      id                    : this.genForm.get('id')?.value === null ? 0 : this.genForm.get('id')?.value,
      serie                 : this.genForm.get('serie')!.value,
      numero                : this.genForm.get('numero')!.value,
      idEntidadCliente      : this.retornarValor(this.genForm.get('idEntidadCliente')!.value),
      idEntidadConcesionario: this.retornarValor(this.genForm.get('idEntidadConcesionario')!.value),
      idTransporteCarreta   : this.retornarValor(this.genForm.get('idTransporteCarreta')!.value),
      idChofer              : this.retornarValor(this.genForm.get('idChofer')!.value),
      idTransporteTractor   : this.retornarValor(this.genForm.get('idTransporteTractor')!.value),
      idUbigeoDestino       : this.retornarValor(this.genForm.get('idUbigeoDestino')!.value),
      idUbigeoOrigen        : this.retornarValor(this.genForm.get('idUbigeoOrigen')!.value),

      fecha                 : '2024-03-03',//this.genForm.get('fecha')!.value,
      fechaTraslado         : this.genForm.get('fechaTraslado')!.value,
      peso                  : '0',//this.genForm.get('peso')!.value,
      estado                : 1,//this.genForm.get('estado')!.value,
      direccionDestino      : this.genForm.get('direccionDestino')!.value,
      direccionOrigen       : this.genForm.get('direccionOrigen')!.value,
      rutaXml               : '',//this.genForm.get('rutaXml')!.value,
      rutaPdf               : '',//this.genForm.get('rutaPdf')!.value,
      rutaCdr               : '',//this.genForm.get('rutaCdr')!.value,

    };
       console.log(guia);
  }
    // let autoid:Autocomplete =  this.genForm.get('idEntidadCliente')!.value;
    // let auto2:Autocomplete;

    // auto2 =this.genForm.get('idEntidadCliente')!.value;

    // console.log("autocomplete");
   // const valiex =this.genForm.get('id')?.value ===null?0:this.genForm.get('id')!.value

    // console.log('p-1',valiex);
    //  console.log('p-2',this.genForm.get('serie')!.value)
    //  console.log('p-3',this.genForm.get('numero')!.value)
    //  console.log('p-4',this.retornarValor(this.genForm.get('idEntidadCliente')!.value))
    //  console.log('p-5',this.retornarValor(this.genForm.get('idEntidadConcesionario')!.value))
    //  console.log('p-6',this.retornarValor(this.genForm.get('idTransporteCarreta')!.value))
    //  console.log('p-7',this.retornarValor(this.genForm.get('idChofer')!.value))
    //  console.log('p-8',this.retornarValor(this.genForm.get('idTransporteTractor')!.value))
    //  console.log('p-9',this.retornarValor(this.genForm.get('idUbigeoDestino')!.value))
    //  console.log('p-10',this.retornarValor(this.genForm.get('idUbigeoOrigen')!.value))


    // const guia: GuiaTransportista = {
    //   id                    : this.genForm.get('id')!.value ==null?0:this.genForm.get('id')!.value,
    //   serie                 : this.genForm.get('serie')!.value,
    //   numero                : this.genForm.get('numero')!.value,
    //   idEntidadCliente      : this.retornarValor(this.genForm.get('idEntidadCliente')!.value),
    //   idEntidadConcesionario: this.retornarValor(this.genForm.get('idEntidadConcesionario')!.value),
    //   idTransporteCarreta   : this.retornarValor(this.genForm.get('idTransporteCarreta')!.value),
    //   idChofer              : this.retornarValor(this.genForm.get('idChofer')!.value),
    //   idTransporteTractor   : this.retornarValor(this.genForm.get('idTransporteTractor')!.value),
    //   idUbigeoDestino       : this.retornarValor(this.genForm.get('idUbigeoDestino')!.value),
    //   idUbigeoOrigen        : this.retornarValor(this.genForm.get('idUbigeoOrigen')!.value),

    //   fecha                 : '2024-03-03',//this.genForm.get('fecha')!.value,
    //   fechaTraslado         : this.genForm.get('fechaTraslado')!.value,
    //   peso                  : '0',//this.genForm.get('peso')!.value,
    //   estado                : 1,//this.genForm.get('estado')!.value,
    //   direccionDestino      : this.genForm.get('direccionDestino')!.value,
    //   direccionOrigen       : this.genForm.get('direccionOrigen')!.value,
    //   rutaXml               : '',//this.genForm.get('rutaXml')!.value,
    //   rutaPdf               : '',//this.genForm.get('rutaPdf')!.value,
    //   rutaCdr               : '',//this.genForm.get('rutaCdr')!.value,
    // };

    // console.log(guia);
    //this.stateCtrlCliente.setValue(1612);
    //this._filterStatesConcesionarioEdicion(1612);
    // Lógica para el botón de regresar
    //this.router.navigate(['guiatransportista/listado']);


}
