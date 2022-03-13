import { I18nService } from 'nestjs-i18n';
type arg = object | Array<any> | null;

export default async function TranslateHelper(
  i18n: I18nService,
  key: string,
  lang: any,
  arg: arg,
) {
  return await i18n.translate(key, { lang: lang, args: arg });
}
