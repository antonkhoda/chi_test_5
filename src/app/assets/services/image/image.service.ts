import { Injectable } from '@angular/core';
import { Storage, ref, deleteObject, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private storage: Storage,
    private toast: HotToastService,
  ) { }

  public async upload(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`;
    let url = '';
    
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        url = await getDownloadURL(storageRef);
      } catch (error: any) {
        this.toast.error(`ERROR: ${error}`);
      }
    } else {
      this.toast.error("ERROR: Wrong format");
    }
    return Promise.resolve(url);
  }
  
  public value(control: string, form: FormGroup): string {
    return form.get(control)?.value;
  }

  public delete(form: FormGroup, imagePath?: string): void {
    imagePath = imagePath ? imagePath : this.value('imagePath', form)
    const task = ref(this.storage, imagePath);

    deleteObject(task).then(() => {
      this.toast.success('File deleted successfully');
      form.patchValue({
        imagePath: null
      })
    })
  }
}
