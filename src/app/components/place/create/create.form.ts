import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import CreateModel from './create.model';

/*
  ReactiveForm structure class
*/
export default class CreateUserForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: CreateModel;

  constructor(model: CreateModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }
  // set form fields with validation rules
  public createForm() {
    this.formGroup = this.formBuilder.group({
      cityId: new FormControl(this.model.cityId, [Validators.required]),
      name: new FormControl(this.model.name, [Validators.required]),
      description: new FormControl(this.model.description),
      rate: new FormControl(this.model.rate, [Validators.required]),
      images: this.formBuilder.array([])
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.images = data.images;
      this.model.name = data.name;
      this.model.cityId = data.cityId;
      this.model.rate = data.rate;
      this.model.description = data.description;
    });
  }
  get propsForms() {
    return this.formGroup.get('images') as FormArray
  }

  public addProp(name = ''): void {
    const prop = this.formBuilder.group({ 
      image: new FormControl(name, [Validators.required])
    })
    this.propsForms.push(prop);
  }

  public deleteProp(i: number): void {
    this.propsForms.removeAt(i)
  }
  // form update
  public patchForm(data: any): void {
    data.images.filter(el => !!el).forEach(el => this.addProp(el))
    delete data.images;
    delete data.coords;
    this.formGroup.patchValue({
      cityId: data.cityId,
      name: data.name,
      description: data.description,
      rate: data.rate
    });
    Object.keys(data).forEach(field => {
      this.model[field] = data[field];
    });
  }

  // get form property name
  public getControl(name: string) {
    return this.formGroup.get(name);
  }

  // get form validation status
  get isValid() {
    return this.formGroup.valid;
  }

  // get group value
  get formData(): CreateModel {
    return this.formGroup.getRawValue();
  }

  // start form validation
  public validate(): void {
    this.validateFormFields(this.formGroup);
  }

  // form validation functionality
  public validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
