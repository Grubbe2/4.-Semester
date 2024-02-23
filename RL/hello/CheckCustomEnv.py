from stable_baselines3 import PPO
import os
from stable_baselines3.common.env_checker import check_env
from RLCustomEnv import SnakeEnv
import time


models_dir = "models/PPO/Snake"
logdir = "logs/Snake"

if not os.path.exists(models_dir):
    os.makedirs(models_dir)

if not os.path.exists(logdir):
    os.makedirs(logdir)

env = SnakeEnv()
env.reset()


model = PPO('MlpPolicy', env, verbose=1, tensorboard_log=logdir)

TIMESTEPS = 10000
for i in range(1,1000000):
    model.learn(total_timesteps=TIMESTEPS, reset_num_timesteps=False, tb_log_name=f"PPO{int(time.time())}")
    model.save(f"{models_dir}/{TIMESTEPS*i}")


env.close()