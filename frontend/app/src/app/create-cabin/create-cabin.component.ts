import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { environment } from '../../environments/environment';
import { Feature } from '../models/Feature';
import { FeatureService } from '../services/features/feature.service';
import { CabinService } from '../services/cabin/Cabin.service';

@Component({
  selector: 'app-create-cabin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-cabin.component.html',
  styleUrl: './create-cabin.component.css',
})
export class CreateCabinComponent {

imagePreviews: string[] = [];
  cabinForm: FormGroup;
  selectedFiles: File[] = [];
  features: Feature[] = [];
  selectedFeature:Feature =null;
  selectedFeatures: Feature[] = [];
  changeFeatureSelected(event: any) {
    
    this.selectedFeature = this.features.find(x => x.id == event.target.value);
    console.log(this.selectedFeature);
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

  constructor(
    private featureService: FeatureService,
    private fb: FormBuilder,
    private http: HttpClient,
    private loginService: LoginService,
    private cabinService:CabinService
  ) {
    this.featureService
      .getFeatures()
      .subscribe((features) => (this.features = features));
    this.cabinForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      availability: [false, Validators.required],
      featureIds: [[], Validators.required],
      photos: [null, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.imagePreviews.forEach(url => URL.revokeObjectURL(url));
    this.imagePreviews = [];
    this.selectedFiles = Array.from(files);
    this.imagePreviews = this.selectedFiles.map(file => URL.createObjectURL(file));
  }
  goback() {
    this.imagePreviews.forEach(url => URL.revokeObjectURL(url));
    this.imagePreviews = [];
    this.selectedFiles = [];
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
}
