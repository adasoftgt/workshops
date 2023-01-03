import boto3

translate = boto3.client('translate')

result = translate.translate_text(
    Text='Hello! My name is Fernando.',
    SourceLanguageCode='auto',
    TargetLanguageCode='es'
)

print(result['TranslatedText'])