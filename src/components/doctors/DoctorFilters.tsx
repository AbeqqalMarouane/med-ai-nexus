
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const formSchema = z.object({
  specialty: z.string().optional(),
  location: z.string().optional(),
  distance: z.number().default(25),
  availability: z.string().optional(),
  gender: z.enum(["any", "male", "female"]).default("any"),
  rating: z.enum(["any", "4plus", "4.5plus"]).default("any"),
});

interface DoctorFiltersProps {
  onFilterChange: (values: z.infer<typeof formSchema>) => void;
}

const DoctorFilters = ({ onFilterChange }: DoctorFiltersProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialty: undefined,
      location: undefined,
      distance: 25,
      availability: undefined,
      gender: "any",
      rating: "any",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onFilterChange(values);
  };

  const handleReset = () => {
    form.reset({
      specialty: undefined,
      location: undefined,
      distance: 25,
      availability: undefined,
      gender: "any",
      rating: "any",
    });
    onFilterChange(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="pulmonology">Pulmonology</SelectItem>
                        <SelectItem value="rheumatology">Rheumatology</SelectItem>
                        <SelectItem value="general">General Practice</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City or zip code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (miles): {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={50}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="next-week">Next Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Doctor Gender</Label>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="any" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Any</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="any" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Any</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="4plus" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">4.0+</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="4.5plus" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">4.5+</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button type="submit">Apply Filters</Button>
        </div>
      </form>
    </Form>
  );
};

export default DoctorFilters;
