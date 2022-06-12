import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FuseUtils } from '@fuse/utils';
import { Contact  } from '../socios-negocios/socio.model';
import { colorSets } from '@swimlane/ngx-charts';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SociosService implements Resolve < any > {

    onContactsChanged: BehaviorSubject < any > ;
    onSelectedContactsChanged: BehaviorSubject < any > ;
    onUserDataChanged: BehaviorSubject < any > ;
    onSearchTextChanged: Subject < any > ;
    onFilterChanged: Subject < any > ;
 
    
  API_URI = environment.ipKey;
    contacts: Contact[];
    user = {
        avatar: "assets/images/avatars/profile.jpg",
        proveedores: [],
        id: "1",
        name: "Empresa",
        clientes: []
    };

    proveedores: any;
    clientes: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;
    constructor(private _httpClient: HttpClient) {
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < any > | Promise < any > | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getContacts(),
                this.getUserData(),
                this.getUserData1()

            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getContacts();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getContacts();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    getContacts(): Promise < any > {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${this.API_URI}` + '/socios')
                .subscribe((response: any) => {

                    this.contacts = response;



                    if (this.filterBy === 'clientes') {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.clientes.includes(_contact.csocio);
                        });
                    }

                    if (this.filterBy === 'proveedores') {
                        this.contacts = this.contacts.filter(_contact => {

                            return this.user.proveedores.includes(_contact.csocio);
                        });
                    }

                    if (this.searchText && this.searchText !== '') {

                        this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                    }

                    this.contacts = this.contacts.map(contact => {
                        return new Contact(contact);
                    });

                    this.onContactsChanged.next(this.contacts);

                    resolve(this.contacts);

                }, reject);
        });
    }

    getUserData(): Promise < any > {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${this.API_URI}` + '/socios/proveedores')
                .subscribe((response: any) => {

                    this.proveedores = response[0];
                    var arrayDeCadenas = this.proveedores.Proveedores.split(",");
                    this.user.proveedores = arrayDeCadenas


                    resolve(this.user);
                }, reject);
        });
    }
    getUserData1(): Promise < any > {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${this.API_URI}` + '/socios/clientes')
                .subscribe((response: any) => {

                    this.clientes = response[0];

                    var arrayDeCadenas = this.clientes.Clientes.split(",");
                    this.user.clientes = arrayDeCadenas



                    this.onUserDataChanged.next(this.user);
                    resolve(this.user);
                }, reject);
        });
    }

    getAll(url: string) {
        return this._httpClient.get(`${this.API_URI}` + url);
      }

    toggleSelectedContact(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            const index = this.selectedContacts.indexOf(id);

            if (index !== -1) {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContacts.push(id);

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        } else {
            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter ? , filterValue ? ): void {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.contacts.map(contact => {
                this.selectedContacts.push(contact.csocio);
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    // updateContact(contact): Promise < any > {
    //     return new Promise((resolve, reject) => {

    //         this._httpClient.put(`${this.API_URI}` +'/socios/' + contact.csocio, {
    //                 ...contact
    //             })
    //             .subscribe(response => {
    //                 this.getContacts();
    //                 resolve(response);
    //             });
    //     });
    // }



    updateContact(socio:any): Promise<any>
    {
        
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${this.API_URI}`+'/socios', socio)
                .subscribe((response: any) => {
                    this.getContacts();
                    this.getUserData();
                    this.getUserData1();
                    resolve(response);
                }, reject);
        });
    }

    addContact(socio:any): Promise<any>
    {
        if (socio.codlista===''){
            socio.codlista='1';
        }
           return new Promise((resolve, reject) => {
            this._httpClient.post(`${this.API_URI}`+'/socios', socio)
                .subscribe((response: any) => {
                    this.getContacts();
                    this.getUserData();
                    this.getUserData1();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise < any > {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, {
                    ...userData
                })
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {


        this._httpClient.post(`${this.API_URI}`+'/socios/delete', contact)
        .subscribe((response: any) => {
            this.getContacts();
            this.getUserData();
            this.getUserData1();
         
        });

        const contactIndex = this.contacts.indexOf(contact);
        this.contacts.splice(contactIndex, 1);
        this.onContactsChanged.next(this.contacts);

    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        
        for (const contactId of this.selectedContacts) {
            const contact = this.contacts.find(_contact => {
                return _contact.csocio === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

}
