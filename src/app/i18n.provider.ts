/**
 * Created by wajidkhilji on 20/04/2017.
 */
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { Observable } from "rxjs/Rx";
import {objectify} from "tslint/lib/utils";
import { environment } from 'environments/environment';
export function getTranslationProviders(): Promise<Object[]> {


  // Get the locale id from the global
  let langStore = localStorage.getItem('locale') as string;
  const locale = langStore ? langStore: environment.locale;
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || locale === environment.locale) {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `./src/locale/messages.${locale}.xlf`;
  return getTranslations(translationFile)
    .then((translations: string) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

function getTranslations(file: string) {
// changes Start here
  let text = "";
  let fileRequest = new XMLHttpRequest();

  fileRequest.onreadystatechange = function () {
    if (fileRequest.readyState === 4) {
      if (fileRequest.status === 200 || fileRequest.status == 0) {
        text = fileRequest.responseText;
      }
    }
  };

  fileRequest.onerror = function (err) {
    console.log(err);
  };
  fileRequest.open("GET", file, false);


  fileRequest.send();
  let observable = Observable.of(text);
  return observable.toPromise();
}
