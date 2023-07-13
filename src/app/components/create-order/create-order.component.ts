import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  // order: Order[] | any;
  proo_cus_order_id:any;
  proo_cus_name: any;
  proo_mob_num:any;
  proo_cus_mrp:any [] = [];
  proo_date:any;
  proo_price:any [] = [];
  newformdata:any[] = [];
  proo_cus_medicine:any [] = [];
  proo_cus_quantity:any [] = [];
  // selectedOrder: Order = { proo_cus_name: any, proo_mob_num:null, proo_cus_address: null, proo_payment: null }

  myForm: FormGroup;
  additionalInputs_med: FormArray | any;
  additionalInputs_qty: FormArray | any;
  additionalInputs_mrp: FormArray | any;
  additionalInputs_price: FormArray | any;
  // myForm = new FormGroup({
  //   prod_name: new FormControl('', [Validators.required]),
  //   prod_mobile: new FormControl('', [Validators.required]),
  //   prod_address: new FormControl('', [Validators.required]),
  //   prod_payment: new FormControl('', [Validators.required]),
  //   prod_amount:new FormControl('', [Validators.required]),
  // });
  order_arr: any [] = [];
  options: any[] = [];
  myControl = new FormControl();
  myControl_med = new FormControl();
  filteredOption: Observable<any[]> | undefined;
  filtereedOption: Observable<any[]> | undefined;
  temp_name: any;
  temp_mob: any;
  temp_address: any;
  temp_payment: any;
  datta: any;
  joined_madicine: any;
  joined_quantity: any;
  sample_madicine: any[] = [];
  sample_quantity: any[] = [];
  newControl_med:any;
  newControl_qty: any;
  newControl_mrp:any;
  newControl_price:any;
  
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.myControl.value);
    if(this.myControl.value != this.options){
      this.proo_mob_num = ""
      // this.proo_cus_address = ""
      // this.proo_payment = []
     }
  }
  
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option,opt_1) =>
      option.toLowerCase().includes(filterValue)
      
    );
  }
  

  constructor(private detailss:DatapassService, private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      prod_order_id: new FormControl('', [Validators.required]),
      prod_name: new FormControl('', [Validators.required]),
      prod_mobile: new FormControl('', [Validators.required]),
      prod_address: new FormControl('', [Validators.required]),
      prod_price: new FormControl('', [Validators.required]),
      prod_mrp: new FormControl('', [Validators.required]),
      prod_date: new FormControl('', [Validators.required]),
      additionalInputs_med: this.formBuilder.array([]),
      additionalInputs_qty: this.formBuilder.array([]),
      additionalInputs_mrp: this.formBuilder.array([]),
      additionalInputs_price: this.formBuilder.array([])

    });
    this.additionalInputs_med = this.myForm.get('additionalInputs_med') as FormArray;
    this.additionalInputs_qty = this.myForm.get('additionalInputs_qty') as FormArray;
    this.additionalInputs_mrp = this.myForm.get('additionalInputs_mrp') as FormArray;
    this.additionalInputs_price = this.myForm.get('additionalInputs_price') as FormArray;
    // console.log(this.additionalInputs_qty.value);
    // console.log(this.additionalInputs_med.value);
    // console.log(this.additionalInputs_mrp.value);
    // console.log(this.additionalInputs_price.value);
    this.addInput();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') { 
      event.preventDefault();
      this.addInput();
    }
  }
  deleteInput(index: number) {
    this.additionalInputs_med.removeAt(index);
    this.additionalInputs_qty.removeAt(index);
    this.proo_cus_medicine.splice(index, 1);
    this.proo_cus_quantity.splice(index, 1);
    console.log(this.additionalInputs_qty.value);
    console.log(this.additionalInputs_med.value);

  }
  
  done() {
    const additionalInputsQtyValues = this.additionalInputs_qty.value;
    const additionalInputsMedValues = this.additionalInputs_med.value;
    const additionalInputsMrpValues = this.additionalInputs_mrp.value;
    const additionalInputsPriceValues = this.additionalInputs_price.value;
  
    // Store the values in an array
    for (let i = 0; i < additionalInputsQtyValues.length; i++) {
      const data = {
        medicine: additionalInputsMedValues[i],
        quantity: additionalInputsQtyValues[i],
        mrp: additionalInputsMrpValues[i],
        price: additionalInputsPriceValues[i]
      };
      this.newformdata.push(data);
    }
  
    // Use the formData array as needed
    console.log(this.newformdata);
  }
  addInput() {
    this.newformdata.splice
     this.newControl_med = this.formBuilder.control('', Validators.required);
     this.newControl_qty = this.formBuilder.control('', Validators.required);
     this.newControl_mrp = this.formBuilder.control('', Validators.required);
     this.newControl_price = this.formBuilder.control('', Validators.required);
      this.additionalInputs_med.push(this.newControl_med);
      this.additionalInputs_qty.push(this.newControl_qty);
      this.additionalInputs_mrp.push(this.newControl_mrp);
      this.additionalInputs_price.push(this.newControl_price);
  
    this.proo_cus_medicine.push('');
    this.proo_cus_quantity.push('');
    this.proo_cus_mrp.push('');
    this.proo_price.push('');
  
    console.log(this.additionalInputs_qty.value);
    console.log(this.additionalInputs_med.value);
    console.log(this.additionalInputs_mrp.value);
    console.log(this.additionalInputs_price.value);

    console.log(this.sample_quantity);
    
  }

  

  ngOnInit(): void {

    this.detailss.read_repots_detail().subscribe((getreport: any) => {
      this.order_arr = getreport;
      console.log(this.order_arr);

      for (let i = 0; i < this.order_arr.length; i++) {
        // this.ori_data.push(this.ELEMENT_DATA[i])
        this.options.push(this.order_arr[i].order_id);
      }
      console.log(this.options);
      this.filteredOption = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
     });
     




    // this.opt_1 = this.ELEMENT_DATA[0].name
    // this.myControl.setValue( this.ELEMENT_DATA[0].name);



   
  }

  limitInputLength(event: any, maxLength: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
      this.proo_mob_num = input.value;
    }
  }
  
  onSelectionChange(value: any) {
 
    
    for (let i=0;i<this.order_arr.length;i++) {
      if (this.order_arr[i].order_id == value) {
        this.temp_name = this.order_arr[i].name
        this.temp_mob = this.order_arr[i].mobile
      }
    }
    this.proo_cus_name = this.temp_name
    this.proo_mob_num = this.temp_mob 
    // this.proo_cus_address = this.temp_address
    // this.proo_payment.push(this.temp_payment)
 
    // console.log(this.proo_payment);
}
okey(){

  this.sample_madicine.push(this.proo_cus_medicine)
  this.sample_quantity.push(this.proo_cus_quantity)
  console.log(this.sample_madicine);
  
  this.joined_madicine = this.proo_cus_medicine.join('$')
  this.joined_quantity = this.proo_cus_quantity.join('$')


console.log(this.joined_madicine);

  this.datta={orderid :this.proo_cus_order_id, name:this.proo_cus_name, mobile:this.proo_mob_num,medicine:this.joined_madicine, quantity:this.joined_quantity, mrp:this.proo_cus_mrp, price:this.proo_price,deliverydate:this.proo_date,}

  console.log(this.datta);


  // this.detailss.store_order_data(this.datta).subscribe((response) => {
  //   console.log("Product data stored: ", response);
  // }, (error) => {
  //   console.error("Failed to store product data: ", error);
  // });

 }

}
