import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      image: new FormControl(this.model.image),
      name: new FormControl(this.model.name, [Validators.required]),
      description: new FormControl(this.model.description),
      site: new FormControl(this.model.site),
      companyId: new FormControl(this.model.companyId, [Validators.required]),
      cityId: new FormControl(this.model.cityId, [Validators.required])
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.image = data.image;
      this.model.name = data.name;
      this.model.description = data.description;
      this.model.site = data.site;
      this.model.companyId = data.companyId;
      this.model.cityId = data.cityId;
    });
  }
  // form update
  public patchForm(data: any): void {
    this.formGroup.patchValue(data);
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
