import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
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
      general: new FormControl(this.model.general, [Validators.required]),
      cityId: new FormControl(this.model.cityId, [Validators.required]),
      props: this.formBuilder.array([])
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.model.general = data.general;
      this.model.cityId = data.cityId;
      this.model.props = data.props;
    });
  }
  get propsForms() {
    return this.formGroup.get('props') as FormArray
  }

  public addProp(name = '', descrition = ''): void {
    const prop = this.formBuilder.group({ 
      name: new FormControl(name, [Validators.required]),
      description: new FormControl(descrition, [Validators.required])
    })
    this.propsForms.push(prop);
  }

  public deleteProp(i: number): void {
    this.propsForms.removeAt(i)
  }
  // form update
  public patchForm(data: any): void {
    this.formGroup.patchValue({cityId: data.cityId, general: data.tips.general});
    data.tips.props.forEach(el => {
      this.addProp(el.name, el.description)
    })
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
