import pandas as pd
import psutil
import os

H = 60 * 60
K = 1000
G = 1024 ** 3

MEMORY_WATT = 0.3725
INTENSITY_MEAN = 429.458
AWS_PUE = 1.2
N_CORES = 16.0
TDP_PER_CORE = 7.5

def check_carbon(runtime: float, country: str):
    power_draw_for_cores = N_CORES
    usage = TDP_PER_CORE
    
    memory = psutil.virtual_memory().used
    power_draw_for_memory = (memory / G) * MEMORY_WATT
    
    PUE = AWS_PUE
    PSF = 1.0
    
    current_location = os.path.dirname(__file__)
    csv_file = os.path.join(current_location, "data", "CI_aggregated.csv")
    df = pd.read_csv(csv_file)
    
    carbon_intensity_series = df.loc[df['countryName'] == country, 'carbonIntensity']
    carbon_intensity = INTENSITY_MEAN
    if not carbon_intensity_series.empty:
        carbon_intensity = carbon_intensity_series.values[0]
    
    energy_needed = (runtime / H) * (power_draw_for_cores * usage + power_draw_for_memory) * PUE * PSF / K
    carbon_emissions = energy_needed * carbon_intensity
    
    # print("##############################")
    # print(f"runtime = {runtime / H} (h)")
    # print(f"power_draw_for_cores = {power_draw_for_cores} (W)")
    # print(f"usage = {usage} ")
    # print(f"memory = {memory / G} (GB)")
    # print(f"MEMORY_WATT = {MEMORY_WATT} (W/GB)")
    # print(f"power_draw_for_memory = {power_draw_for_memory} (W)")
    # print(f"energy_needed = {energy_needed} (kWh)")
    # print(f"carbon_intensity = {carbon_intensity} (g CO2e/kWh)")
    # print(f"carbon_emissions = {carbon_emissions} (g CO2e)")
    # print("##############################")
    
    return carbon_emissions, energy_needed, (memory / G)

"""
carbon_footprint(gCO2e) = energy_needed(kWh) * carbon_intensity(gCO2e/kWh)
energy_needed(kWh) = runtime / 3600 (h) * (power draw for cores(W) * usage(단위x) + power draw for memory(W)) * PUE(단위x) * PSF(단위x) / 1024(k)

country list 
{'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'China', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Gambia, The', 'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan', 'Korea', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States of America'}

"""