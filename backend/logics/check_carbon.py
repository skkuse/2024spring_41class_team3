import pandas as pd
import os

def check_carbon(runtime: float, power_draw_for_memory: float, country: str):
    
    # 배포 서버 환경으로 수정 필요
    power_draw_for_cores = 1
    usage = 1
    PUE = 1.2 # aws
    PSF = 1
    
    # carbon_intensity
    current_location = os.path.dirname(__file__)
    csv_file = os.path.join(current_location, "data", "CI_aggregated.csv")
    df = pd.read_csv(csv_file)
    
    # 있으면 => country db도 갱신.
    carbon_intensity = df.loc[df['countryName'] == country, 'carbonIntensity'].values[0]
    
    # 없으면 => 평균으로 계산하고, db 갱신 없음
    energy_needed = runtime * (power_draw_for_cores * usage + power_draw_for_memory) * PUE * PSF
    carbon_emissions = energy_needed * carbon_intensity
    
    return carbon_emissions, energy_needed

# carbon footprint(g Co2e)
# => (runtime x (power draw for cores x usage + power draw for memory) x PUE x PSF) x carbon intensity

# cpu cores usage(cores)
# energy needed => kWh
# runtime => from excute_java.py
# power draw for cores => 가정
# usage => 1로 가정 => TDP로 전환
# power draw for memory(kB) => from excute_java.py
# PUE => 1.2 가정
# PSF => 1 가정
# carbon intensity -> from CI_aggregated.csv

"""

carbon_footprint(gCO2) = energy_needed(kWh) * carbon_intensity(gCO2/kWh)
energy_needed(kWh) = runtime(h) * (power draw for cores * usage(W) + power draw for memory(W)) * PUE * PSF

"""