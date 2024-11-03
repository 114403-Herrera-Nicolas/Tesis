import { Component } from '@angular/core';
import { Cabin } from '../models/Cabin';
import { CabinService } from '../services/cabin/Cabin.service';
import { LoginService } from '../services/auth/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeatureService } from '../services/features/feature.service';
import { Feature } from '../models/Feature';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-cabin',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-cabin.component.html',
  styleUrl: './update-cabin.component.css'
})
export class UpdateCabinComponent {
  cabin: Cabin ;
  parametro: string;

  selectedFiles: File[]=[];
  imagePreviews: string[]=[];
  baseUrl: string = environment.urlApi;
  cabinForm: FormGroup;
  features: Feature[] = [];
  selectedFeature:Feature =null;
  selectedFeatures: Feature[] = [];

  changeFeatureSelected(event: any) {
    
    this.selectedFeature = this.features.find(x => x.id == event.target.value);
    console.log(this.selectedFeature);
  }

  constructor(private featureService: FeatureService,private cabinService:CabinService,private route: ActivatedRoute,private router: Router,
    private loginService:LoginService,private fb: FormBuilder,
){
  this.featureService
      .getFeatures()
      .subscribe((features) => (this.features = features));
this.route.paramMap.subscribe(params => {
this.parametro = params.get('id');
});

cabinService.getCabinById(this.parametro).subscribe(cabin=>{
  this.cabin=cabin;
  console.log(cabin.name)
  this.loadFilesFromUrls(cabin.photos).then(async files => {
     this.selectedFiles = await files; // Asigna el resultado a tu array de archivos
    this.imagePreviews.forEach(url => URL.revokeObjectURL(url));
    this.imagePreviews = [];
    this.selectedFiles = Array.from(files);
    this.imagePreviews = this.selectedFiles.map(file => URL.createObjectURL(file));
  });

  this.cabinForm = this.fb.group({
      name: [cabin.name, Validators.required],
      description: [cabin.description, Validators.required],
      location: [cabin.location, Validators.required],
      pricePerNight: [cabin.pricePerNight, [Validators.required, Validators.min(0)]],
      capacity: [cabin.capacity, [Validators.required, Validators.min(1)]],
      availability: [true, Validators.required],
      featureIds: [cabin.features, Validators.required],
      photos: [this.selectedFiles, Validators.required],
    });

    this.selectedFeatures=cabin.features;
});

}

  async loadFilesFromUrls(urls: string[]): Promise<File[]> {
    const files: File[] = [];
  
    for (const url of urls) {
      const response = await fetch(this.baseUrl+url);
      const blob = await response.blob();
  
      // Crear un archivo desde el blob (ajusta el nombre de archivo si es necesario)
      const file = new File([blob], "imagen-cargada.jpg", { type: blob.type });
      files.push(file);
    }
  
    return files;
  }










  submitForm(): void {
    const formData = new FormData();

    // Agregar fotos al FormData
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => {
        formData.append('photos', file, file.name);
      });
    } else {
      console.error('No files selected');
      alert('Please select at least one photo.');
      return;
    }

    // Crear un objeto con los detalles de la cabaña
    const cabinDetails = {
      name: this.cabinForm.get('name')?.value,
      description: this.cabinForm.get('description')?.value,
      location: this.cabinForm.get('location')?.value,
      pricePerNight: this.cabinForm.get('pricePerNight')?.value,
      capacity: this.cabinForm.get('capacity')?.value,
      availability: this.cabinForm.get('availability')?.value,
      featureIds: this.selectedFeatures.map((feature: Feature) => feature.id),
    };

    
    this.cabinService.createCabin(formData, cabinDetails)
      .then((response) => {
        console.log('Cabin created successfully', response);
        alert('Cabin created successfully!');
      })
      .catch((error) => {
        console.error('Error creating cabin', error);
        alert('There was an error creating the cabin. Please try again.');
      });
  }

  ngOnDestroy(): void {
    
    this.imagePreviews.forEach(url => URL.revokeObjectURL(url));
  }
 
  


  addFeature() {
    // Comprobar si el ID ya está en el array
    if(this.selectedFeature.id==null || this.selectedFeature.id==0){
     console.log("No feature selected");
     return;
    }
    if (!this.selectedFeatures.includes(this.selectedFeature)) {
     this.selectedFeatures.push(this.selectedFeature); // Añadir si no existe
     this.features.splice(this.features.indexOf(this.selectedFeature), 1);
     console.log("Added Feature ID:", this.selectedFeature);
   } else {
     console.log("Feature ID already selected:", this.selectedFeature);
   }
 
   console.log("Current Selected Features:", this.selectedFeatures); // Mostrar el array de IDs seleccionados
 }
   
removeFeature(index: number) {
  this.features.push(this.selectedFeatures[index]);
  this.selectedFeatures.splice(index, 1);
  
} 

onFileSelected(event: any): void {
  const files: FileList = event.target.files;
  this.imagePreviews.forEach(url => URL.revokeObjectURL(url));
  this.imagePreviews = [];
  this.selectedFiles = Array.from(files);
  this.imagePreviews = this.selectedFiles.map(file => URL.createObjectURL(file));
}
}
