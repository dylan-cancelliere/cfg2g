import webbrowser as wb
from datetime import datetime as dt

company_name = input("enter the company you want to research:\n")
company_name = company_name.replace("&", "%26").replace("\"", "%22")
google_search_format = "https://www.google.com/search?q="
search_terms = ['Raytheon', 'Elbit', 'L3Harris', 'Northrop Grumman', 'Lockheed Martin', 'General Dynamics', 'Boeing',
                'Pratt %26 Whitney', 'General Electric', 'Israel', 'Palestine', 'Gaza', 'military', 'missile', 'F-16',
                'F-35', 'revenue']
fpds_search_format = f'https://www.fpds.gov/ezsearch/fpdsportal?indexName=awardfull&templateName=1.5.3&s=FPDS.GOV&q=%22{company_name}%22+DEPARTMENT_FULL_NAME%3A%22DEPT+OF+DEFENSE%22+SIGNED_DATE%3A[2023%2F10%2F07%2C{dt.now().year}%2F{dt.now().month:02d}%2F{dt.now().day:02d}]'

wb.open_new(google_search_format+f"%22{company_name}%22")
wb.open_new_tab(fpds_search_format)
for term in search_terms:
    search_term = f'%22{company_name}%22+%22{term}%22'
    # print(google_search_format+search_term)
    wb.open_new_tab(google_search_format+search_term)
