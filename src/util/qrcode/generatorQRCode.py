import qrcode
from PIL import Image

def generate_qr_code_with_logo(data, output_path, qr_size=290):
    # Gerar o QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Criar a imagem do QR code
    qr_img = qr.make_image(fill_color="#597cff", back_color="white").convert('RGB')

    # Salvar a imagem final
    qr_img.save(output_path)

# Dados para o QR code
data = r""
# Caminho do arquivo de saída
output_path = ""

generate_qr_code_with_logo(data, output_path)
