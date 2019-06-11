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
      email: new FormControl(this.model.email, [Validators.required, Validators.email]),
      firstName: new FormControl(this.model.firstName, [Validators.required]),
      surName: new FormControl(this.model.surName, [Validators.required]),
      password: new FormControl(this.model.password, [Validators.required]),
      role: new FormControl(this.model.role, [Validators.required, Validators.minLength(8)]),
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.email = data.email;
      this.model.surName = data.surName;
      this.model.password = data.password;
      this.model.firstName = data.firstName;
      this.model.role = data.role;
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
